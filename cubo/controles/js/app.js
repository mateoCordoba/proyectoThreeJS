// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;

function init() {

    // Get a reference to the container element that will hold our scene
    container = document.querySelector('#scene-container');
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8FBCD4);

    createCamera();
    createControls();
    createLights();
    createMeshes();
    createRenderer();
    renderer.setAnimationLoop(() => {

        update();
        render();

    });

}

function createCamera() {

    camera = new THREE.PerspectiveCamera(
        35, // FOV
        container.clientWidth / container.clientHeight, // aspect

        0.1, // near clipping plane
        100, // far clipping plane
    );

    camera.position.set(-4, 4, 10);
}

function createControls() {
    controls = new THREE.OrbitControls(camera, container);
}

function createLights() {

    // Create a directional light
    const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 3);
    scene.add(ambientLight);

    const minLight = new THREE.DirectionalLight(0xffffff, 5);
    minLight.position.set(10, 10, 10);

    // remember to add the light to the scene
    scene.add(ambientLight, minLight);

}

function createMeshes() {

    const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load('textures/download.png');

    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 16;

    const material = new THREE.MeshStandardMaterial({
        map: texture,
    });

    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

}

function createRenderer() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
    renderer.physicallyCorrectLights = true;


    container.appendChild(renderer.domElement);

}


// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {

    // increase the mesh's rotation each frame

}

// render, or 'draw a still image', of the scene
function render() {

    renderer.render(scene, camera);

}

// a function that will be called every time the window gets resized.
// It can get called a lot, so don't put any heavy computation in here!
function onWindowResize() {

    // set the aspect ratio to match the new browser window aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener('resize', onWindowResize);
// call the init function to set everything up
init();