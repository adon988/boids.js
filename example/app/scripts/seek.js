var camera, scene, renderer;
var bird, target;


function animate() {
    
    requestAnimationFrame( animate );
    render();
    
}

function render() {
    
    if (bird.inSight(target)) {
        target = new boids.Vector3(
            Math.random() * $('#main').width()  / 3 - $('#main').width()  / 6,
            Math.random() * $('#main').height() / 3 - $('#main').height() / 6,
            Math.random() * $('#main').width()  / 3 - $('#main').width()  / 6
        );
    }
    
    bird.seek(target);
    bird.update();
    
    renderer.render(scene, camera);
    
}

$(function() {
    
    try {
        renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch (e) {
        alert('Sorry, but your graphics card does not seem to support WebGL.');
        return;
    }
    
    camera = new THREE.PerspectiveCamera(75, $('#main').width() / $('#main').height(), 1, 10000);
    camera.position.z = 100;
    
    bird = new Bird();
    target = new boids.Vector3();
    
    scene = new THREE.Scene();
    scene.add(bird);
    
    renderer.setSize($('#main').width(), $('#main').height());
    renderer.setClearColor(new THREE.Color(0xfff9f4));
    
    $('#main').append(renderer.domElement)
    
    animate();
    
});