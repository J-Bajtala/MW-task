/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Particle;

var _distance = __webpack_require__(1);

var _distance2 = _interopRequireDefault(_distance);

var _collision = __webpack_require__(3);

var _collision2 = _interopRequireDefault(_collision);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minDist = 150;

function getLineAlpha(dist, minDist) {
    var a = 1 / minDist * -1,
        b = 1,
        //max opacity (1.0)
    x = dist;

    return a * x + b;
};

// creating single particle

function Particle(x, y, radius, color, canvas) {
    var _this = this;

    this.x = x;
    this.y = y;
    this.velocity = {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5
    };
    this.radius = radius;
    this.color = color;
    this.mass = 2;

    this.update = function (particles) {
        var c = canvas.getContext('2d');
        _this.draw();

        for (var i = 0; i < particles.length; i++) {

            if (_this === particles[i]) continue;
            var dist = (0, _distance2.default)(_this.x, _this.y, particles[i].x, particles[i].y);

            //collision check and bounce effect
            if (dist - _this.radius * 2 < 0) {
                (0, _collision2.default)(_this, particles[i]);
            };

            // drawing lines
            if (dist < 150) {
                c.beginPath();
                c.strokeStyle = 'rgba(255, 255, 255, ' + getLineAlpha(dist, minDist) + ')';
                c.moveTo(_this.x, _this.y);
                c.lineTo(particles[i].x, particles[i].y);
                c.lineWidth = 2;
                c.stroke();
                c.closePath();
            };
        };
        // protection from leaving the canvas

        if (_this.x - _this.radius <= 0 || _this.x + _this.radius >= innerWidth) {
            _this.velocity.x = -_this.velocity.x;
        };

        if (_this.y - _this.radius <= 0 || _this.y + _this.radius >= innerHeight) {
            _this.velocity.y = -_this.velocity.y;
        };

        _this.x += _this.velocity.x;
        _this.y += _this.velocity.y;
    };

    this.draw = function () {
        var c = canvas.getContext('2d');
        c.beginPath();
        c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.fillStyle = _this.color;
        c.closePath();
    };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = distance;
function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _particle = __webpack_require__(0);

var _particle2 = _interopRequireDefault(_particle);

var _distance = __webpack_require__(1);

var _distance2 = _interopRequireDefault(_distance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// random integer function

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// creating various particles and particles push

var particles = void 0;
var particlesCount = 30;

function init() {
    particles = [];

    for (var i = 0; i < particlesCount; i++) {
        var radius = (Math.random() + 1) * 10;
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(radius, canvas.height - radius);
        var color = "blue";

        if (i !== 0) {
            for (var j = 0; j < particles.length; j++) {
                if ((0, _distance2.default)(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);

                    j = -1;
                };
            };
        };

        particles.push(new _particle2.default(x, y, radius, color, canvas));
    };
};

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (particle) {
        particle.update(particles);
    });
};

init();
animate();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = resolveCollision;

function rotate(velocity, angle) {
    var rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
};

function resolveCollision(particle, otherParticle) {
    var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    var xDist = otherParticle.x - particle.x;
    var yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        var m1 = particle.mass;
        var m2 = otherParticle.mass;

        // Velocity before equation
        var u1 = rotate(particle.velocity, angle);
        var u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        var v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        var v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        var vFinal1 = rotate(v1, -angle);
        var vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);