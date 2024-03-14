#version 460

in vec3 incident, n;

uniform samplerCube tex_cm;
uniform float alpha=0.5;

out vec4 color;

void main() {

    vec3 i = normalize(incident);
    vec3 nn = normalize(n);
    vec3 refl = reflect(i,nn);

    float opacity = 1 - dot(-i,nn);

    color = vec4(texture(tex_cm, refl).rgb, alpha);

}