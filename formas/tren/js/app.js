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

    camera.position.set(-5, 5, 7);
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

function createMaterials() {
    const body = new THREE.MeshStandardMaterial({
        color: 0xff3333, // red
        flatShading: true,
    });

    // just as with textures, we need to put colors into linear color space
    body.color.convertSRGBToLinear();

    const detail = new THREE.MeshStandardMaterial({
        color: 0x333333, // darkgrey
        flatShading: true,
    });

    detail.color.convertSRGBToLinear();

    return {

        body,
        detail,

    };

}

function createGeometries() {
    const nose = new THREE.CylinderBufferGeometry(0.75, 0.75, 3, 12);
    const cabin = new THREE.BoxBufferGeometry(2, 2.25, 1.5);
    const chimney = new THREE.CylinderBufferGeometry(0.3, 0.1, 0.5);

    const wheel = new THREE.CylinderBufferGeometry(0.4, 0.4, 1.75, 16);
    wheel.rotateX(Math.PI / 2);


    return {
        nose,
        cabin,
        chimney,
        wheel
    };
}

function createMeshes() {
    // create a Group to hold the pieces of the train
    const train = new THREE.Group();
    scene.add(train);
    const materials = createMaterials();
    const geometries = createGeometries();
    const nose = new THREE.Mesh(geometries.nose, materials.body);
    nose.rotation.z = Math.PI / 2;
    nose.position.x = -1;

    const cabin = new THREE.Mesh(geometries.cabin, materials.body);
    cabin.position.set(1.5, 0.4, 0);

    const chimney = new THREE.Mesh(geometries.chimney, materials.detail);
    chimney.position.set(-2, 0.9, 0);
    const smallWheelRear = new THREE.Mesh(geometries.wheel, materials.detail);
    smallWheelRear.position.set(0, -0.5, 0);

    const smallWheelCenter = smallWheelRear.clone();
    smallWheelCenter.position.x = -1;

    const smallWheelFront = smallWheelRear.clone();
    smallWheelFront.position.x = -2;
    const bigWheel = smallWheelRear.clone();
    bigWheel.scale.set(2, 2, 1.25);
    bigWheel.position.set(1.5, -0.1, 0);
    train.add(nose,
        cabin,
        chimney,

        smallWheelRear,
        smallWheelCenter,
        smallWheelFront,
        bigWheel, );
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