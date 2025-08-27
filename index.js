import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";


console.log("hello world?");
const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//camera
const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

//orbit
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.04;


//geo
const geo = new THREE.IcosahedronGeometry(1.0,2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo,mat);
scene.add(mesh);

//geo-geo1
const wiremat = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
const wiremesh = new THREE.Mesh(geo,wiremat);
wiremesh.scale.setScalar(1.01);
mesh.add(wiremesh);


//light
const hemilight = new THREE.HemisphereLight(0xffaabb,0xbc3dd);
scene.add(hemilight);


//animation renderer
function animate(t = 0){
    requestAnimationFrame(animate);
    mesh.rotation.y = t*0.0002;
    renderer.render(scene,camera);
    controls.update();
}


animate();
