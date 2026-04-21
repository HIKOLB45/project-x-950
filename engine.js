// НАЛАШТУВАННЯ 3D
let scene, camera, renderer, canopy;

function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    const container = document.getElementById('canvas-3d');
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0x00f2ff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    createCanopy(5, 4.8);
    animate();
}

function createCanopy(l, w) {
    if (canopy) scene.remove(canopy);
    
    canopy = new THREE.Group();
    const material = new THREE.MeshPhongMaterial({ color: 0x00f2ff, wireframe: true });
    
    // Дах
    const roofGeo = new THREE.BoxGeometry(l, 0.1, w);
    const roof = new THREE.Mesh(roofGeo, material);
    roof.position.y = 2.5;
    canopy.add(roof);

    // Стійки
    const postGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.5);
    const positions = [
        [-l/2, 1.25, -w/2], [l/2, 1.25, -w/2],
        [-l/2, 1.25, w/2], [l/2, 1.25, w/2]
    ];

    positions.forEach(pos => {
        const post = new THREE.Mesh(postGeo, material);
        post.position.set(...pos);
        canopy.add(post);
    });

    scene.add(canopy);
}

function updateProject() {
    const l = parseFloat(document.getElementById('length').value);
    const w = parseFloat(document.getElementById('width').value);
    const p = parseFloat(document.getElementById('price').value);

    // КАЛЬКУЛЯТОР
    const weight = (l * w * 12).toFixed(1); // Приблизна вага на м2
    const cost = (weight * (p/5)).toFixed(0); // Орієнтовна ціна
    const load = 180; // Снігове навантаження

    document.getElementById('res-weight').innerText = weight;
    document.getElementById('res-cost').innerText = cost;
    document.getElementById('res-load').innerText = load;

    createCanopy(l, w);
}

function animate() {
    requestAnimationFrame(animate);
    if (canopy) canopy.rotation.y += 0.005;
    renderer.render(scene, camera);
}

window.onload = init3D;
