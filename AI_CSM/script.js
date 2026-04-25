let camera, scene, renderer, controls;

init();
animate();

function init() {
    // Setting up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Setting up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    // Create scene
    scene = new THREE.Scene();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // OrbitControls for mouse rotation and zoom
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    // Loading the GLTF/GLB model
    const loader = new THREE.GLTFLoader();
    loader.load('https://hamslice.xyz/AI_CSM/glb_GoblinHead_mesh_01.glb', (gltf) => {
        scene.add(gltf.scene);
    });

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}