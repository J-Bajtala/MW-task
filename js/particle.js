const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
import distance from './distance';
import resolveCollision from './collision';

export default function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: Math.random() -0.5,
        y: Math.random() -0.5
    }
    this.radius = radius;
    this.color = color;
    this.mass = 2;

    this.update = particles => {
        this.draw();

        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue;

            if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                resolveCollision(this, particles[i]);
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
            this.velocity.x = -this.velocity.x;
        };

        if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
            this.velocity.y = -this.velocity.y;
        };

        if (distance(this.x, this.y, particles[i].x, particles[i].y) < 100) {
            console.log ('line drawn');
        }

        

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();

    };
}

