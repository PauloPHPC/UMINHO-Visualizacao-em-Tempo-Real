#version 460

//in vec4 cor;
in vec3 n, ld;
uniform vec4 diffuse;
out vec4 color;

void main() {
    vec3 nn = normalize(n);

    float intensity = (max(0.0, dot(nn, ld)));

    float i;
    if(intensity > 0.9)
        i = 1.0;
    else if(intensity > 0.66)
        i = 0.75;
    else if(intensity > 0.33)
        i = 0.5;
    else
        i = 0.25;

    vec4 cor = diffuse * max(0.3, i);

    color = cor;
}