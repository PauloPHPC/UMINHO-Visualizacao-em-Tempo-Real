#version 460

// uniforms
uniform sampler2D tex;
// interpolated inputs
in vec2 tc;
// output
out vec4 color;

void main() {

    color = texture(tex,tc*2); //vec4(tc, 0,0); //vec4(0,1,0,1);
}