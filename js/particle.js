import distance from './distance';
import resolveCollision from './collision';

const minDist = 150;

function getLineAlpha(dist, minDist){
    var a = (1 / minDist) * -1,
        b = 1, //max opacity (1.0)
        x = dist;
    
    return (a * x) + b;
};

// creating single particle

export default function Particle(x, y, radius, color, canvas) {
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
        const c = canvas.getContext('2d');
        this.draw();

        for (let i = 0; i < particles.length; i++) {
            
            if (this === particles[i]) continue;
            const dist = distance(this.x, this.y, particles[i].x, particles[i].y);
            
            //collision check and bounce effect
            if (dist - this.radius * 2 < 0) {
                resolveCollision(this, particles[i]);
            };

            // drawing lines
            if (dist < 150) {
                c.beginPath(); 
                c.strokeStyle = `rgba(255, 255, 255, ${getLineAlpha(dist, minDist)})`;
                c.moveTo(this.x, this.y)
                c.lineTo(particles[i].x, particles[i].y)
                c.lineWidth = 2;
                c.stroke();
                c.closePath()  
            };
        };
        // protection from leaving the canvas
        
        if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
            this.velocity.x = -this.velocity.x;
        };

        if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
            this.velocity.y = -this.velocity.y;
        };

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };

    this.draw = () => {
        const c = canvas.getContext('2d');
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.fillStyle = this.color;
        c.closePath();
    };
};
