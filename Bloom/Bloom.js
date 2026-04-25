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

// Create a material with emissive color
const material = new THREE.MeshBasicMaterial({
  color: 0x000000,
  emissive: 0x00ff00,
  emissiveIntensity: 1,
});

// Create a mesh with the geometry and material
const mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);

// Create the Unreal Bloom pass
const renderPass = new THREE.RenderPass(scene, camera);
const bloomPass = new THREE.UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 3;
bloomPass.radius = 0.5;

// Create the Effect Composer and add the passes
const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(bloomPass);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the mesh
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  // Render the scene with the Effect Composer
  composer.render();
}

// Start the animation loop
animate();
