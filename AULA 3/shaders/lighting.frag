#version 460

//uniform
uniform vec4 diffuse;
uniform vec4 l_dir; // world space
uniform mat4 m_view;

// input
in vec3 n;

// output
out vec4 color;

void main() {


    color = vec4(0.5);
}