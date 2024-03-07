#version 330

uniform float shininess = 128;
uniform sampler2D texEarth, texSpec, texNight, texClouds;

in	vec4 eye;
in	vec3 n;
in	vec3 ld;
in vec2 texCoord;

out vec4 colorOut;

void main() {

	vec4 eColor = texture(texEarth, texCoord);
	float eSpec = texture(texSpec,texCoord).r;
	vec4 eNight = texture(texNight,texCoord);
	float eClouds = texture(texClouds,texCoord).r;


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

	vec4 cDay = intensity * eColor + eClouds + spec * eSpec * (1-eClouds);
	vec4 cNight = eNight * (1-eClouds);
	
	float f = smoothstep(0, 0.2, intensity);
	colorOut = mix(cNight, cDay, f);

}