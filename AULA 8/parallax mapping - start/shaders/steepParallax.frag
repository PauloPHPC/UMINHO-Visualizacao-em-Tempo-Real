#version 150

uniform sampler2D diffuse, normalMap;

uniform float bumpScale = 0.05;

uniform int linSteps = 32;
uniform int binSteps = 8;

uniform int shadowLinSteps = 32;

in vec3 ld, eye; // tangent space
in vec2 tc;

out vec4 colorOut;

void main() {

    float height = 1.0;

    float h = texture(normalMap, tc).w;
    vec3 eye_n = normalize(eye);

    float step = 1.0 / linSteps;
    vec2 delta = bumpScale * eye_n.xy * step / abs(eye_n.z);

    vec2 offset = tc;

    while(h < height) {
        height -= step;
        offset += delta;
        h = texture(normalMap, offset).w;
    }

    vec4 color = texture(diffuse, offset);

    vec3 n = normalize(texture(normalMap, offset).rgb * 2.0 - 1.0);
    float intensity = max(0.0, dot(n, normalize(ld)));

    vec3 ld_n = normalize(ld);
    float selfShadow = 0.0;
    if(intensity > 0) {

        step = 1.0 / shadowLinSteps;
        delta = bumpScale * eye_n.xy * step / abs(ld_n.z);

        do {
            height += step;
            offset += delta;
            h = texture(normalMap, offset).w;

        } while(h <= height && height < 1.0);

        if(height <= 1.0) {
            selfShadow = 1;

        }

    }

    colorOut = color * (intensity * selfShadow + 0.4);
}