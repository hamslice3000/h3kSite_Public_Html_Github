// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Create a custom shader material for the glowing effect
const glowingMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0.0 },
  },
  vertexShader: `
    varying vec3 vNormal;

    void main() {
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 2.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    uniform float time;

    void main() {
      float intensity = 0.5 + 0.5 * sin(time * 4.0);
      vec3 glowColor = vec3(0.0, 1.0, 0.0);
      vec3 glow = vNormal * intensity;
      gl_FragColor = vec4(glowColor + glow, 2.0);
    }
  `,
});

// Create a mesh with the geometry and the glowing material
const mesh = new THREE.Mesh(geometry, glowingMaterial);

// Add the mesh to the scene
scene.add(mesh);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update the time uniform in the shader material
  glowingMaterial.uniforms.time.value += 0.01;

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
