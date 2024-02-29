#version 460

// uniforms
uniform mat4 m_pvm;
uniform mat3 m_normal;

// input streams - local space
in vec4 position;
in vec3 normal;

//output
out vec3 n; // normal in camera space

void main() {

    n = normalize(m_normal*normal); //Deve ser feito toda vez que tiver matriz normal
        
    gl_Position = m_pvm * position;
}