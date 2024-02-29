#version 460

// uniforms
uniform sampler2D tex;
uniform int div = 5;
uniform vec4 diffuse = vec4(0.3, 0.3, 0.6,0);
uniform vec4 secondary_diffuse = vec4(0.5, 0.5, 0.5, 0);
uniform float width = 0.5;

// interpolated inputs
in vec2 tc;
// output
out vec4 color;

void main() {

    vec2 fr = fract(tc * div);

    if (fr.s > width)
        color = diffuse;
    else
        color = secondary_diffuse; // Faz com que o teapot fique com duas cores em barras.



    // color = texture(tex,tc*2); //vec4(tc, 0,0); //vec4(0,1,0,1);
    
    // vec2 res = textureQueryLod(tex, tc.st); //ST indica que é uma coordenada de textura. Para cor usa-se RGB.
    
    // if (res.x == 0)
    //     color = vec4(1,0,0,0);
    // else if (res.x <1)
    //     color = vec4(0, 1, 0, 0);
    // else if (res.x <2)
    //     color = vec4(0, 0, 1, 0);
    // else if (res.x <3)
    //     color = vec4(0, 1, 1, 0);
    // else if (res.x <4)
    //     color = vec4(1, 0, 1, 0);
    // else if (res.x <5)
    //     color = vec4(1, 1, 0, 0);
    // else
    //     color = vec4(0.5);


}