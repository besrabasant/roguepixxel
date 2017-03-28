import * as WHS from 'whs';
import Plexus from './components/plexus.js';
import GlitchPass from './components/glitch-pass';
import { Logo, logoIsLoaded } from './components/logo';
import titles from './components/titles';
import Utils from './Utils';

export class homeScene {
    constructor() {

        this.isOn = false;

        const mouse = new WHS.app.VirtualMouseModule();

        const postprocessor = new WHS.app.PostProcessorModule();


        //SCENE INIT

        const camera = new WHS.app.CameraModule({
            position: (Utils.isMobileDevice()) ? new THREE.Vector3(0, 10, 500) : new THREE.Vector3(0, -60, 500),
            fov: 45,
            near: 0.1,
            far: 3000
        });
        const renderer = new WHS.app.RenderingModule({
            bgColor: 0xeeeeee,
            renderer: {
                antialias: true,
                shadowmap: {
                    type: THREE.PCFSoftShadowMap
                },
                shadowMapBias: 0.00001,
                shadowMapDarkness: 0.5,
                shadowMapWidth: 1024,
                shadowMapHeight: 1024,
                gammaInput: true,
                gammaOutput: true
            }
        }, { shadow: true });
        const scene = new WHS.app.SceneModule();

        this.world = new WHS.App([
            new WHS.app.ElementModule({
                container: document.getElementById('home-scene')
            }),
            scene,
            camera, renderer,
            new WHS.controls.OrbitModule({
                target: new THREE.Vector3(0, 0, 0),
                follow: true
            }),
            new WHS.app.ResizeModule(),
            mouse,
            postprocessor
        ]);

        //lights
        new WHS.AmbientLight({
            light: {
                color: 0xffffff,
                intensity: 2
            }
        }).addTo(this.world);

        const light = new WHS.PointLight({
            light: {
                color: 0xffffff,
                intensity: 2,
                distance: 50
            },

            position: (Utils.isMobileDevice()) ? [0, -20, 120] : [150, 0, 130],
            castShadow: false,
        });
        light.addTo(this.world);

        const spotLight = new WHS.SpotLight({
            light: {
                color: 0xffffff,
                intensity: 1,
                distance: 1000,
                angle: 0.9,
                penumbra: 0.7,
                decay: 1.8
            },

            position: [170, 600, -100],

            castShadow: true,
        });
        spotLight.native.target.position.set(80, 20, 270);
        spotLight.native.target.updateMatrixWorld();
        spotLight.addTo(this.world);


        const plane = new WHS.Plane({
            geometry: {
                width: 1000,
                height: 1200
            },

            material: new THREE.MeshStandardMaterial({
                color: 0xeeeeee
            }),
            position: [0, -130, 0],
            receiveShadow: true

        });

        plane.native.rotateX(-Math.PI / 2);

        plane.addTo(this.world);

        //plexus

        const plexus = new Plexus();
        plexus.mesh.addTo(this.world);

        document.addEventListener('mousemove', function() {
            plexus.component.onMouseMove(mouse.project());
        });

        // logo

        const logo = new Logo();
        logo.addTo(this.world);

        //titles 
        titles.addTo(this.world);


        const loop = new WHS.Loop((clock) => {
            plexus.component.animate();
            if (logoIsLoaded) {
                logo.animate();
            }
        });
        loop.start(this.world);

        // glitch

        postprocessor.createRenderPass(false);

        const glitchPass = new GlitchPass('Glitch');
        glitchPass.renderToScreen = true;

        postprocessor.addPass(glitchPass);

    }

    start() {
        this.isOn = true;
        this.world.start();
    }

    stop() {
        this.isOn = false;
        this.world.stop();
    }
}