#version 330

uniform sampler2D diffuse, normalMap;
uniform float scale = 0.04, bias = 0.0;

in vec3 ld, eye; // tangent space
in vec2 tc;

out vec4 colorOut;

void main() {

	float h = texture(normalMap, tc).a;
	float disp_scale = (1 - h) * scale - bias;

	vec3 eye_n = normalize(eye);
	vec2 texCoord = tc + disp_scale * eye_n.xy / abs(eye_n.z);

	vec3 n = texture(normalMap, texCoord).xyz * 2 - 1;
	n = normalize(n);

	float intensity = max(0.0, dot(n, normalize(ld)));

	colorOut = (intensity + 0.4) * texture(diffuse, texCoord);
}