#version 330

uniform float shininess = 128;

in	vec4 eye;
in	vec3 n;
in	vec3 ld;

out vec4 colorOut;

void main() {


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
	colorOut = max(intensity * vec4(1) + spec, vec4(1) * 0.25);
}