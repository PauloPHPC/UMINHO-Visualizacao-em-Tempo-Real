#version 460

in vec4 position;
in vec4 normal;

uniform mat4 m_pvm, m_m;
uniform vec3 cam_pos;

out vec3 incident, n;

void main() {

    mat4 m = inverse(transpose(m_m));
    n = normalize(vec3(m * normal));

    vec3 pos = vec3(m_m * position);
    incident = pos - cam_pos;

    gl_Position = m_pvm * position;

}