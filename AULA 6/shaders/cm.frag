#version 460

// in vec3 incident, n;

 uniform samplerCube tex_cm;
// uniform float alpha=0.5;
// uniform float eta = 1.1;

in vec3 incident, n;

//uniform samplerCube texUnit;
uniform float f = 0.005;
uniform float power = 2.0;
uniform float bias = 0.3;
uniform float scale = 2.0;
uniform float eta = 0.66;

out vec4 color;

void main() {
    vec3 n = normalize(n);
    vec3 i = normalize(incident);

    vec3 trefl = reflect(i,n);

    vec3 trefrRED = refract(i,n,eta);
    vec3 trefrGREEN = refract(i,n,eta + 0.01);
    vec3 trefrBLUE = refract(i,n,eta + 0.02);

    vec3 refl = texture(tex_cm, trefl).rgb;
    vec3 refr;
    refr.r = texture(tex_cm,trefrRED).r;
    refr.g = texture(tex_cm,trefrGREEN).g;
    refr.b = texture(tex_cm,trefrBLUE).b;

    float R = 1.0 - eta*eta*(1.0-dot(n,-i)*dot(n,-i));

    color = vec4(mix(refl,refr,R),1);
    

















    // vec3 i = normalize(incident);
    // vec3 nn = normalize(n);
    // vec3 refl = reflect(i,nn);
    // vec4 crefl = texture(tex_cm, refl);

    // vec3 refr = refract(i, nn, eta);
    // vec4 crefr = texture(tex_cm, refr);


    // float dot_in = dot(-i,nn);
    // float k = 1 - eta*eta*(1-dot_in*dot_in);

    // color = mix(crefl, crefr, k);

    // color = vec4(texture(tex_cm, refl).rgb, alpha);

}