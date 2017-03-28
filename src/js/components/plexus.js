import * as WHS from 'whs';
import Utils from '../Utils';

import PlexusParticles from './plexus-particles';
import PlexusLines from './plexus-lines';

export default class Plexus {
    constructor(params = {}) {
        if (Utils.isMobileDevice()) {
            this.particleCount = 400;
            this.maxConnections = 20;

        } else {
            this.particleCount = 800;
            this.maxConnections = 50;
        }
        this.minDistance = 70;
        this.velocity = 0.5;
        this.acceleration = new THREE.Vector3(0, 0, 0);

        this.r = 0.75 * ((window.innerHeight > window.innerWidth) ? window.innerHeight : window.innerWidth);
        this.rHalf = this.r / 2;
        this.rZ = 200;
        this.maxSpeed = 0.7;
        this.init_particles();

        this.plexusParticles = new PlexusParticles(Plexus);
        this.plexusLines = new PlexusLines(this);

        if (Utils.isMobileDevice()) {
            this.plexusParticles.material.materials[0].size = 0.9;
            this.plexusParticles.material.materials[1].size = 1.45;
        }

        return { particles: this.plexusParticles, 'mesh': new WHS.Group(this.plexusParticles, this.plexusLines), 'component': this };
    }
    init_particles() {
        Plexus.particlesData = [];
        Plexus.particles = new THREE.BufferGeometry();

        Plexus.particlePositions = new Float32Array(this.particleCount * 3);

        for (var i = 0; i < this.particleCount; i++) {
            if (Utils.isMobileDevice()) {
                var x = Math.random() * this.r - this.r / 2;
                var y = Math.random() * this.r - 130;
            } else {

                var x = Math.random() * this.r - this.r / 2;
                var y = Math.random() * this.r / 2.5 - 130;
            }
            var z = Math.random() * -this.rZ;
            Plexus.particlePositions[i * 3] = x;
            Plexus.particlePositions[i * 3 + 1] = y;
            Plexus.particlePositions[i * 3 + 2] = z;


            Plexus.particlesData.push({
                velocity: new THREE.Vector3(-this.velocity + Math.random() * this.velocity, -this.velocity + Math.random() * this.velocity, -this.velocity + Math.random() * this.velocity),
                numConnections: 0
            });

        }

        Plexus.particles.setDrawRange(0, this.particleCount);
        Plexus.particles.addGroup(0, this.particleCount * 0.1, 1);
        Plexus.particles.addGroup(this.particleCount * 0.1 + 1, this.particleCount, 0);
        Plexus.particles.addAttribute('position', new THREE.BufferAttribute(Plexus.particlePositions, 3).setDynamic(true));


    }

    onMouseMove(mouse) {
        for (var i = 0; i < this.particleCount; i++) {
            var particleData = Plexus.particlesData[i];

            var p = new THREE.Vector3(Plexus.particlePositions[i * 3], Plexus.particlePositions[i * 3 + 1], Plexus.particlePositions[i * 3 + 2]);
            var d = mouse.distanceTo(p);
            if (d < 80) {
                var steer = new THREE.Vector3();
                steer.x = (Plexus.particlePositions[i * 3] - mouse.x);
                steer.y = (Plexus.particlePositions[i * 3 + 1] - mouse.y);
                steer.z = (Plexus.particlePositions[i * 3 + 2] - mouse.z);
                steer.multiplyScalar(0.1 / d);
                this.acceleration.add(steer);
                particleData.velocity.x += this.acceleration.x;
                particleData.velocity.y += this.acceleration.y;
                // particleData.velocity.z += this.acceleration.z;

            }
        }
    }



    animate() {

        var vertexpos = 0;
        var colorpos = 0;
        var numConnected = 0;
        for (var i = 0; i < this.particleCount; i++)
            Plexus.particlesData[i].numConnections = 0;
        for (var i = 0; i < this.particleCount; i++) {
            // get the particle
            var particleData = Plexus.particlesData[i];

            var l = Math.sqrt(particleData.velocity.x * particleData.velocity.x + particleData.velocity.y * particleData.velocity.y + particleData.velocity.z * particleData.velocity.z);

            if (l > this.maxSpeed) {
                particleData.velocity.x = particleData.velocity.x / (l / this.maxSpeed);
                particleData.velocity.y = particleData.velocity.y / (l / this.maxSpeed);
                particleData.velocity.z = particleData.velocity.z / (l / this.maxSpeed);
            }
            Plexus.particlePositions[i * 3] += particleData.velocity.x;
            Plexus.particlePositions[i * 3 + 1] += particleData.velocity.y;
            Plexus.particlePositions[i * 3 + 2] += particleData.velocity.z;
            this.acceleration.set(0, 0, 0);
            if (Plexus.particlePositions[i * 3 + 1] < -130 || Plexus.particlePositions[i * 3 + 1] > this.r / 3)
                particleData.velocity.y = -particleData.velocity.y;
            if (Plexus.particlePositions[i * 3] < -this.rHalf || Plexus.particlePositions[i * 3] > this.rHalf)
                particleData.velocity.x = -particleData.velocity.x;
            if (Plexus.particlePositions[i * 3 + 2] < -this.rZ || Plexus.particlePositions[i * 3 + 2] > 0)
                particleData.velocity.z = -particleData.velocity.z;
            if (particleData.numConnections >= this.maxConnections)
                continue;

            // Check collision
            for (var j = i + 1; j < this.particleCount; j++) {
                var particleDataB = Plexus.particlesData[j];

                if (particleDataB.numConnections >= this.maxConnections)
                    continue;

                var dx = Plexus.particlePositions[i * 3] - Plexus.particlePositions[j * 3];
                var dy = Plexus.particlePositions[i * 3 + 1] - Plexus.particlePositions[j * 3 + 1];
                var dz = Plexus.particlePositions[i * 3 + 2] - Plexus.particlePositions[j * 3 + 2];
                var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < this.minDistance) {
                    particleData.numConnections++;
                    particleDataB.numConnections++;
                    var alpha = 1 - dist / this.minDistance;
                    this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[i * 3];
                    this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[i * 3 + 1];
                    this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[i * 3 + 2];
                    this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[j * 3];
                    this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[j * 3 + 1];
                    this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[j * 3 + 2];

                    this.plexusLines.colors[colorpos++] = alpha;
                    this.plexusLines.colors[colorpos++] = alpha;
                    this.plexusLines.colors[colorpos++] = alpha;
                    this.plexusLines.colors[colorpos++] = alpha;
                    this.plexusLines.colors[colorpos++] = alpha;
                    this.plexusLines.colors[colorpos++] = alpha;
                    numConnected++;
                }
            }
        }
        this.plexusLines.geometry.setDrawRange(0, numConnected * 2);
        this.plexusLines.geometry.attributes.position.needsUpdate = true;
        this.plexusLines.geometry.attributes.color.needsUpdate = true;
        this.plexusParticles.geometry.attributes.position.needsUpdate = true;
    }


}