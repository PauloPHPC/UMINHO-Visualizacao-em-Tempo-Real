#version 330

layout(triangles) in;
layout (triangle_strip, max_vertices=6) out;

uniform mat4 m_proj;

uniform vec4 camPos, camView, camUp;
uniform vec4 l_dir;

uniform float eye_separation = 0.03;

in DataV2G {
	vec4 normal;
} DataIn[];

out Data {
	vec3 normal;
	vec3 eye;
	vec3 lightDir;
} DataOut;

// this example assumes the model matrix to be the identity matrix,
// hence, we can use the view matrix as the normal matrix

void main() {


}