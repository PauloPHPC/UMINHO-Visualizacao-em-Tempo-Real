#version 330 core

layout(triangles) in;
layout(line_strip, max_vertices = 6) out;

in vec3 Normal[];
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main() {
	for(int i = 0; i < gl_in.length(); i++) {
		gl_Position = projection * view * model * gl_in[i].gl_Position;
		EmitVertex();
		gl_Position = projection * view * model * (gl_in[i].gl_Position + vec4(Normal[i], 0.0) * 0.1); // Ajuste o fator de escala conforme necessário
		EmitVertex();
		EndPrimitive();
	}
}
