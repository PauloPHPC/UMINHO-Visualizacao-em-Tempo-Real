#version 330 core
out vec4 FragColor;

in vec3 Normal;

void main()
{
    // Normalizar a normal do fragmento para garantir que tem magnitude 1
    vec3 norm = normalize(Normal);
    // Usar a normal como cor para visualizar a direção
    FragColor = vec4(norm * 0.5 + 0.5, 1.0); // Transforma [-1,1] para [0,1]
}

