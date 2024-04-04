#version 460

uniform sampler2D diffuseY, diffuseB, diffuseG, diffuseR, diffuseBl,
	rust, specularMap, normalMap, 
	normal, trangent, texCoord, pos;

uniform mat4 m_view;

in vec2 tc;
in vec3 ld;

out vec4 colorOut;

void main() {

	vec3 n = texture(normal,tc).xyz;
	if (n == vec3(0.0,0.0,0.0)) {
		discard;
		return;
	}

	n = normalize(n * 2 - 1);
	vec3 t =  normalize(texture(tangent,tc).xyz * 2 -1);
	
	vec4 p = texture(pos,tc);
	vec4 pos_cam = m_view * vec4(p.xyz, 1.0);

	vec2 tc_obj = texture(texCoord, tc).st;

	vec3 b = normalize(cross(n,t));
	vec3 tbn = mat3(t,b,n);

	vec3 eye = normalize(-pos_cam.xyz);
	vec3 nMap = normalize(texture(normalMap,tc_obj).xyz * 2 - 1);

	nMap = tbn * nMap;

	vec3 ldn = normalize(ld);

	int cr = int(p.w);

	vec4 color;
	if (cr == 0) {
		color = texture(diffuseY, tc_obj);
	}
	else if (cr == 1) {
		color = texture(diffuseB, tc_obj);
	}
	else if (cr == 2) {
		color = texture(diffuseG, tc_obj);
	}
	else if (cr == 3) {
		color = texture(diffuseR, tc_obj);
	}
	else {
		color = texture(diffuseBl, tc_obj);
	}

	colorOut = color;

//	vec4 texRust = texture(





}