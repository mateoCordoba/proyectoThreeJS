// estas variables las utilizaremos en varios metodos por eso las declaramos
let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {

    // Obtenemos una referencia al elemento que tendra nuestra escena
    container = document.querySelector('#scene-container');

    // creamos una escena y le damos color
    scene = new THREE.Scene();

    scene.background = new THREE.Color('purple');

    //Configuramos una camara en perspectiva
    const fov = 35; // fov = campo de vicion
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 100;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // cada objeto se crea inicialmente en (0, 0, 0)
    // moveremos la cámara un poco hacia atrás para que podamos ver la escena   
    camera.position.set(0, 0, 10);

    // creamos una geometry
    const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

    // creamos un material estándar púrpura
    const material = new THREE.MeshStandardMaterial({ color: 0x800080 });

    // creamos una malla que contiene la geometría y el material
    mesh = new THREE.Mesh(geometry, material);

    // agregamos la malla al objeto de la escena
    scene.add(mesh);

    // Creamos una luz direccional
    const light = new THREE.DirectionalLight(0xffffff, 5.0);

    // movemos la luz hacia atrás y sube un poco
    light.position.set(10, 10, 10);

    // agregamos la luz a la escena
    scene.add(light);


    // se crea un WebGLRenderer y establece su ancho y alto
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setPixelRatio(window.devicePixelRatio);

    // agrega el elemento creado automáticamente <canvas> a la página
    container.appendChild(renderer.domElement);
    renderer.setAnimationLoop(() => {
        update();
        render();
    })

}

function update() {
    // aumentar la rotación de la malla en cada cuadro
    mesh.rotation.z += 0.01;
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

}

function render() {
    // renderizar, o 'crear una imagen fija', de la escena
      // esto creará una imagen fija / marco cada vez que se anima
         // la función se llama a sí misma
    renderer.render(scene, camera);
}

function onWindowResize() {

    // establecer la relación de aspecto para que coincida con la nueva 
    //relación de aspecto de la ventana del navegador
    camera.aspect = container.clientWidth / container.clientHeight;

    // actualizar el tronco de la cámara
    camera.updateProjectionMatrix();

    // actualizar el tamaño del renderizador Y el lienzo
    renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener('resize', onWindowResize);
// llamar a la función init para configurar todo
init();