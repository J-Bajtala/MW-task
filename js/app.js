import Particle from './particle';
import dist from './distance'; 

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// random integer function

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

// creating various particles and particles push

let particles;
const particlesCount = 30;

function init () {
    particles = [];

    for (let i = 0; i < particlesCount; i++) {
        const radius = (Math.random() + 1) * 10; 
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        const color = "blue";
        
        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) {
                if (dist(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);
                    
                    j = -1;
                };
            };
        };
        
        particles.push(new Particle(x, y, radius, color, canvas));
        
    };
};

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update(particles);
    });
};



init();
animate();