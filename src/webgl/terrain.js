/**
 * Shaders for the hero terrain.
 *
 * A flat grid of line segments displaced on Z by layered simplex noise, so it
 * reads as a contour survey of a landscape rather than a decorative blob.
 * The pointer pushes a soft ripple through it; scroll tilts the whole sheet.
 */

/* 2D simplex noise — Ashima Arts / Stefan Gustavson, MIT licensed.
   https://github.com/ashima/webgl-noise */
const SIMPLEX = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`

export const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec2  uPointer;     // pointer in plane space
uniform float uPointerAmt;  // 0 when the pointer has never been over the hero
uniform float uAmp;
uniform float uRadius;

varying float vElev;
varying float vDist;
varying float vRipple;

${SIMPLEX}

void main() {
  vec3 p = position;

  // Two octaves drifting at different speeds — the slow one gives the
  // landmass, the fast one keeps the surface from ever looking static.
  float n  = snoise(p.xy * 0.16 + vec2(uTime * 0.045, uTime * 0.028));
  n += 0.45 * snoise(p.xy * 0.42 - vec2(uTime * 0.06, uTime * 0.017));
  n += 0.18 * snoise(p.xy * 0.95 + vec2(0.0, uTime * 0.08));

  // Soft gaussian swell that follows the pointer.
  float d = distance(p.xy, uPointer);
  float ripple = exp(-d * d * 0.022) * 2.6 * uPointerAmt;

  // A travelling wave inside the ripple so it feels like displaced water.
  ripple *= 0.75 + 0.25 * sin(d * 1.1 - uTime * 2.2);

  p.z = n * uAmp + ripple;

  vElev   = p.z;
  vRipple = ripple;
  vDist   = length(p.xy) / uRadius;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`

export const fragmentShader = /* glsl */ `
uniform vec3  uInk;
uniform vec3  uAccent;
uniform float uOpacity;

varying float vElev;
varying float vDist;
varying float vRipple;

void main() {
  // Height drives the ink→accent ramp, so ridges catch the rust colour
  // the same way a contour map keys height to tone.
  float t = smoothstep(-0.9, 2.2, vElev);
  t = max(t, smoothstep(0.15, 1.6, vRipple));

  vec3 colour = mix(uInk, uAccent, t);

  // Fade to nothing at the rim so the sheet has no visible cut edge.
  float rim = 1.0 - smoothstep(0.55, 1.0, vDist);

  float alpha = uOpacity * rim * (0.28 + 0.72 * t);
  if (alpha < 0.004) discard;

  gl_FragColor = vec4(colour, alpha);
}
`

/**
 * A grid of line segments — rows and columns kept separate so we get clean
 * quads instead of the triangle diagonals THREE.WireframeGeometry produces.
 */
export function buildGridPositions(segments, size) {
  const step = size / segments
  const half = size / 2
  const lines = 2 * segments * (segments + 1)
  const positions = new Float32Array(lines * 2 * 3)

  let o = 0
  const put = (x, y) => {
    positions[o++] = x
    positions[o++] = y
    positions[o++] = 0
  }

  for (let j = 0; j <= segments; j++) {
    const y = -half + j * step
    for (let i = 0; i < segments; i++) {
      const x = -half + i * step
      put(x, y)
      put(x + step, y)
    }
  }

  for (let i = 0; i <= segments; i++) {
    const x = -half + i * step
    for (let j = 0; j < segments; j++) {
      const y = -half + j * step
      put(x, y)
      put(x, y + step)
    }
  }

  return positions
}
