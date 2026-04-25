//new scene
var scene = new THREE.Scene();
const backgroundColor = 0xf1f1f1;
scene.background = new THREE.Color(backgroundColor);

//new camera
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(30, 0, -30);
//camera.lookAt(scene.position);

//new renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//model
//var geometry = new THREE.PlaneBufferGeometry(10, 10, 10, 10);
//geometry.rotateX(-Math.PI * 0.5);

//model to mesh
//var plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
  //wireframe: true,
  //color: "red"
//}));

//blender model
const MODEL_PATH = './Doge_Stacy_Named_Uncompressed_LE_05.glb';
const canvas = document.querySelector('#c');
const backgroundColor = 0xf1f1f1;

//loads gltf as THREE.js???
var loader = new THREE.GLTFLoader();
loader.load(
      MODEL_PATH,
      function(gltf) {
        model = gltf.scene;
        let fileAnimations = gltf.animations;
        }
);

model.scale.set(2, 2, 2);
model.position.y = -11;

//model to mesh
var plane = new THREE.Mesh(model, new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "red"
}));

//model to scene
scene.add(plane);

var points = new THREE.Points(model, new THREE.PointsMaterial({
  size: 0.25,
  color: "yellow"
}));

scene.add(points);

var raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.25;
var mouse = new THREE.Vector2();
var intersects = null;
var plane = new THREE.Plane();
var planeNormal = new THREE.Vector3();
var currentIndex = null;
var planePoint = new THREE.Vector3();
var dragging = false;

window.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mousemove", mouseMove, false);
window.addEventListener("mouseup", mouseUp, false);

function mouseDown(event) {
  setRaycaster(event);
  getIndex();
  dragging = true;
}

function mouseMove(event) {
  if (dragging && currentIndex !== null) {
    setRaycaster(event);
    raycaster.ray.intersectPlane(plane, planePoint);
    model.attributes.position.setXYZ(currentIndex, planePoint.x, planePoint.y, planePoint.z);
    model.attributes.position.needsUpdate = true;
  }
}

function mouseUp(event) {
  dragging = false;
  currentIndex = null;
}

function getIndex() {
  intersects = raycaster.intersectObject(points);
  if (intersects.length === 0) {
    currentIndex = null;
    return;
  }
  currentIndex = intersects[0].index;
  setPlane(intersects[0].point);
}

function setPlane(point) {
  planeNormal.subVectors(camera.position, point).normalize();
  plane.setFromNormalAndCoplanarPoint(planeNormal, point);
}

function setRaycaster(event) {
  getMouse(event);
  raycaster.setFromCamera(mouse, camera);
}

function getMouse(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

render();

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}