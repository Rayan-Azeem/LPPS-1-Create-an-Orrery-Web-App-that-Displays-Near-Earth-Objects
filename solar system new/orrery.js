// Setup the scene, camera, and renderer
const container = document.getElementById('container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);  // Black background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 200, 400);  // Set camera far enough to view everything

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Add orbit controls to allow camera interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create Earth using Three.js built-in material
const earthGeometry = new THREE.SphereGeometry(30, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({
    color: 0x1E90FF,  // Blue color to represent the Earth
    roughness: 0.7,   // Adjust for a less shiny appearance
    metalness: 0.0    // Earth is not metallic
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(0, 0, 0);  // Ensure Earth is centered
scene.add(earth);

// Add a light source (sunlight effect)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 100, 100);
scene.add(directionalLight);

// Add ambient light to softly illuminate the scene
const ambientLight = new THREE.AmbientLight(0x404040);  // Soft ambient light to ensure visibility
scene.add(ambientLight);

// Asteroids data and their orbits
const asteroidsData = [
    { name: "Apophis", semiMajorAxis: 150, semiMinorAxis: 100, speed: 0.015, size: 4, color: "#FF5733", axisTilt: 0.3 },
    { name: "Bennu", semiMajorAxis: 200, semiMinorAxis: 150, speed: 0.01, size: 3, color: "#C70039", axisTilt: 0.5 },
    { name: "1950 DA", semiMajorAxis: 250, semiMinorAxis: 170, speed: 0.008, size: 5, color: "#900C3F", axisTilt: 0.7 },
    { name: "Toutatis", semiMajorAxis: 300, semiMinorAxis: 200, speed: 0.006, size: 4, color: "#581845", axisTilt: 0.2 },
    { name: "1981 Midas", semiMajorAxis: 350, semiMinorAxis: 220, speed: 0.009, size: 3, color: "#FFC300", axisTilt: 0.6 },
    { name: "Orpheus", semiMajorAxis: 400, semiMinorAxis: 250, speed: 0.007, size: 3, color: "#DAF7A6", axisTilt: 0.4 }
];

const asteroids = [];

// Create asteroids and set their properties
asteroidsData.forEach(asteroidData => {
    // Create the asteroid itself
    const asteroidGeometry = new THREE.DodecahedronGeometry(asteroidData.size);
    const asteroidMaterial = new THREE.MeshPhongMaterial({ color: asteroidData.color });
    const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

    // Set initial position of the asteroid
    asteroid.orbit = {
        semiMajorAxis: asteroidData.semiMajorAxis,
        semiMinorAxis: asteroidData.semiMinorAxis,
        speed: asteroidData.speed,
        angle: Math.random() * Math.PI * 2,  // Random starting angle
        axisTilt: asteroidData.axisTilt  // Tilt the orbit of the asteroid
    };

    asteroids.push(asteroid);
    scene.add(asteroid);
});

// Animation loop to move the asteroids
function animateAsteroids() {
    asteroids.forEach(asteroid => {
        // Update the angle of the asteroid's position along the orbit
        asteroid.orbit.angle += asteroid.orbit.speed;

        const x = asteroid.orbit.semiMajorAxis * Math.cos(asteroid.orbit.angle);
        const z = asteroid.orbit.semiMinorAxis * Math.sin(asteroid.orbit.angle);

        // Tilt the asteroid's orbit and set its position
        asteroid.position.set(
            x * Math.cos(asteroid.orbit.axisTilt), 
            x * Math.sin(asteroid.orbit.axisTilt), 
            z
        );

        // Rotate the asteroid itself for realism
        asteroid.rotation.x += 0.01;
        asteroid.rotation.y += 0.01;
    });
}

// Main animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();  // Update controls
    animateAsteroids();  // Move asteroids
    renderer.render(scene, camera);  // Render the scene
}

// Handle window resize
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Start the animation
animate();
