#version 330


uniform sampler2D earthTex, specTex, nightTex, cloudsTex;
uniform float shininess = 128;
uniform float timer;

in	vec4 eye;
in	vec2 texCoord;
in	vec3 n;
in	vec3 ld;

out vec4 colorOut;


float snoise(vec4 p);

float perlinNoise(vec4 p) {

    float c=0, amp = 1.0;
    vec4 freq = p;


    for (int i = 0; i < 5; ++i) {
        c = c + snoise(freq) * amp;
        amp *= 0.5;
        freq *= 2;
    }

    c = c * 0.5 + 0.5;

    return c;
}

const float PI = 3.14159;

void main() {

    vec4 eColor = texture(earthTex, texCoord);
    float  eSpec = texture(specTex, texCoord).r;
    vec4 eNight = texture(nightTex, texCoord);
    //float eClouds = texture(cloudsTex, texCoord).r;

    vec2 t = vec2(2 * PI * texCoord.s + timer*0.00001 , PI * (texCoord.t - 0.5));
    vec3 sc = vec3(sin(t.s)*cos(t.t) , sin(t.t), cos(t.s)*cos(t.t)) ;

    float eClouds = perlinNoise(vec4(sc,timer* 0.00001) * 8);
    
    //float eClouds = perlinNoise(vec4(texCoord ,timer* 0.00001,0) * 16);
    eClouds = smoothstep(0.4, 0.9, eClouds) * 0.8;
	// set the specular term to black
	vec4 spec = vec4(0.0);

	// normalize both input vectors
	vec3 nd = normalize(n);
	vec3 e = normalize(vec3(eye));

	float intensity = max(dot(nd,ld), 0.0);

	// if the vertex is lit compute the specular color
	if (intensity > 0.0) {
		// compute the half vector
		vec3 h = normalize(ld + e);	
		// compute the specular intensity
		float intSpec = max(dot(h,nd), 0.0);
		// compute the specular term into spec
		spec = vec4(1) * pow(intSpec,shininess);
	}


    vec4 colorDay = max((intensity * eColor + spec * eSpec) * (1-eClouds) + eClouds, (eColor * (1-eClouds) + eClouds) * 0.25);
    vec4 colorNight = eNight * (1 - eClouds);

    float f = smoothstep(0,0.1, intensity);
    colorOut = mix(colorNight, colorDay, f);

}



