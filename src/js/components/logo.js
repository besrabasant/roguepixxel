import * as WHS from 'whs';
import Utils from '../Utils';


const textures = {
    bmap: new THREE.TextureLoader().load("dist/webgl/textures/normal.jpg"),
    smap: new THREE.TextureLoader().load("dist/webgl/textures/specular.jpg"),
    dmap: new THREE.TextureLoader().load("dist/webgl/textures/diffuse.jpg")
}

const loader = new THREE.JSONLoader();

const comp = new THREE.Object3D();
comp.position.set(0, 0, 0);
comp.castShadow = true;

const material = new THREE.MeshPhongMaterial({
    color: 0x808080,
    emissive: 0xf,
    specular: 0xaaaaaa,
    map: textures.dmap,
    specularMap: textures.smap,
    bumpMap: textures.bmap,
    bumpScale: 1,
    shininess: 3000,
    // wireframe: true
});

var cubeobj = {};

var cube = {
    pos: {
        x: 170,
        y: -20,
        z: 80
    },
    rot: {
        x: 0.05,
        y: Math.PI / 2.45,
        z: -0.50
    },
    scale: {
        x: 2,
        y: 2,
        z: 2
    }
}

if (Utils.isMobileDevice()) {
    cube = {
        pos: {
            x: 0,
            y: -60,
            z: 80
        },
        rot: {
            x: -0.2,
            y: Math.PI / 2,
            z: -0.50
        },
        scale: {
            x: 1.5,
            y: 1.5,
            z: 1.5
        }
    }
}

var logoIsLoaded = false;

loader.load(
    'dist/webgl/models/box.json',
    function(geometry) {
        geometry.center();

        cubeobj = new THREE.Mesh(geometry, material);
        cubeobj.castShadow = true;
        cubeobj.position.set(cube.pos.x, cube.pos.y, cube.pos.z);
        cubeobj.scale.set(cube.scale.x, cube.scale.y, cube.scale.z);
        cubeobj.rotateY(cube.rot.y);
        cubeobj.rotateZ(cube.rot.z);

        comp.add(cubeobj);
        logoIsLoaded = true;
    }
);

class Logo extends WHS.MeshComponent {

    build() {
        return comp;
    }

    animate() {
        cubeobj.position.y = cube.pos.y + Math.cos(Date.now() * 0.0009) * 10;
        cubeobj.rotation.z = cube.rot.z + Math.sin(Date.now() * 0.001) * Math.PI * 0.025; //z
        cubeobj.rotation.y = cube.rot.y + Math.sin(Date.now() * 0.00095) * Math.PI * 0.035; //y
        cubeobj.rotation.x = cube.rot.x + Math.sin(Date.now() * 0.0015) * Math.PI * 0.035; //x
    }

}



export { Logo as Logo, logoIsLoaded as logoIsLoaded }