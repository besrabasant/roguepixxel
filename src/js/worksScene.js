import * as WHS from 'whs';

const transparentMap = new THREE.TextureLoader().load("dist/img/trans.png");

const textureMaps = {
    prana: [
        new THREE.TextureLoader().load("dist/img/prana.jpg"),
        new THREE.TextureLoader().load("dist/img/prana2.png"),
        new THREE.TextureLoader().load("dist/img/prana3.png")
    ],
    kgbvlapung: [
        new THREE.TextureLoader().load("dist/img/kgvb.jpg"),
        new THREE.TextureLoader().load("dist/img/kgvb2.png"),
        transparentMap,
    ],
    amlimited: [
        new THREE.TextureLoader().load("dist/img/amltd.jpg"),
        new THREE.TextureLoader().load("dist/img/amltd2.png"),
        transparentMap
    ]
}

const textures = ['prana', 'kgbvlapung', 'amlimited'];

textures.forEach((group, index) => {
    console.log(group);
    textureMaps[group].forEach((texture, index) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
    });
});


var worksPlane = {}
worksPlane.width = 1300;
worksPlane.height = (9 / 16 * worksPlane.width) * 0.7;
worksPlane.rotation = [0, 0, 0]


class worksScene {
    constructor() {

        this.isOn = false;
        this.current = 0;

        const mouse = new WHS.app.VirtualMouseModule();
        const camera = new WHS.app.CameraModule({
            position: new THREE.Vector3(0, 0, 1200),
            fov: 35,
            near: 0.1,
            far: 5000
        });
        const renderer = new WHS.app.RenderingModule({
            bgColor: 0xdedede,
            renderer: {
                antialias: true,
                shadowmap: {
                    type: THREE.PCFSoftShadowMap
                },
                shadowMapSoft: true,
                shadowMapBias: 0.00001,
                shadowMapDarkness: 0.5,
                shadowMapWidth: 1024,
                shadowMapHeight: 1024,
                gammaInput: true,
                gammaOutput: true,
                preserveDrawingBuffer: true
            }
        }, { shadow: true });
        const scene = new WHS.app.SceneModule();

        this.world = new WHS.App([
            new WHS.app.ElementModule({
                container: document.getElementById('works_viewer')
            }),
            scene,
            camera, renderer,
            // new WHS.controls.OrbitModule({
            //     target: new THREE.Vector3(0, 0, 0),
            //     follow: true
            // }),
            new WHS.app.ResizeModule(),
            mouse
        ]);

        //lights
        new WHS.AmbientLight({
            light: {
                color: 0xffffff,
                intensity: 2
            }
        }).addTo(this.world);

        const spotLight = new WHS.SpotLight({
            light: {
                color: 0xffffff,
                intensity: 2,
                distance: 2500,
                angle: 1,
                penumbra: 0.1,
                decay: 1
            },

            position: [0, 2000, -150],

            castShadow: true,
        });
        spotLight.native.target.position.set(180, 0, 0);
        spotLight.native.target.updateMatrixWorld();
        spotLight.addTo(this.world);

        this.planes = [
            new WHS.Plane({
                geometry: {
                    width: worksPlane.width,
                    height: worksPlane.height
                },

                material: new THREE.MeshLambertMaterial({
                    color: 0x808080,
                }),
                position: [0, 0, 0],
                rotation: worksPlane.rotation,
                receiveShadow: true
            }),
            new WHS.Plane({
                geometry: {
                    width: worksPlane.width,
                    height: worksPlane.height
                },

                material: new THREE.MeshLambertMaterial({
                    color: 0x808080,
                    transparent: true
                }),
                position: [0, 0, 30],
                rotation: worksPlane.rotation,
                scale: [0.95, 0.95, 1],
                receiveShadow: true,
            }),
            new WHS.Plane({
                geometry: {
                    width: worksPlane.width,
                    height: worksPlane.height
                },

                material: new THREE.MeshLambertMaterial({
                    color: 0x808080,
                    transparent: true,
                }),
                position: [0, 0, 60],
                rotation: worksPlane.rotation,
                scale: [0.95, 0.95, 1],
                receiveShadow: true,
            })
        ];

        this.planes.forEach((plane, index) => {
            plane.material.map = textureMaps[textures[this.current]][index];
            plane.addTo(this.world);
        });


        const floor = new WHS.Plane({
            geometry: {
                width: 2500,
                height: 2500
            },

            material: new THREE.MeshStandardMaterial({
                color: 0xdedede
            }),
            position: [0, -290, -700],
            rotation: [-Math.PI / 2, 0, 0],
            receiveShadow: true

        });
        floor.addTo(this.world);


        var mousepos = new THREE.Vector3(0, 0, 0);

        document.addEventListener('mousemove', function() {
            mousepos = mouse.project().multiplyScalar(0.2);

        });

        const loop = new WHS.Loop((clock) => {
            camera.camera.position.x += (mousepos.x - camera.camera.position.x) * 0.05;
            camera.camera.position.y += (mousepos.y - camera.camera.position.y) * 0.05;
            camera.camera.native.lookAt(new THREE.Vector3(0, 0, 0));

        });
        loop.start(this.world);
    }

    start() {
        this.isOn = true;
        this.world.start();
    }

    stop() {
        this.isOn = false;
        this.world.stop();
    }

    next() {
        this.current++;
        if (this.current > (textures.length - 1)) {
            this.current = 0;
        }
        this.updateTexture();
    }

    prev() {
        this.current--;
        if (this.current < 0) {
            this.current = (textures.length - 1);
        }
        this.updateTexture();
    }

    updateTexture() {
        this.planes.forEach((plane, index) => {
            plane.material.map = textureMaps[textures[this.current]][index];
        })
    }
}

const works = new worksScene();

export { works as default }