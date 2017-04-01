import * as WHS from 'whs';
import Utils from '../Utils';
import titlesTextures from "./titleTextures";

var titleComp = new THREE.Mesh(new THREE.PlaneGeometry(500, 250), (new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: titlesTextures.currentTexture(),
    transparent: true
})));

class Titles extends WHS.MeshComponent {

    build() {
        return titleComp;
    }
}

var params = {
    pos: [-100, 0, 50],
    rot: [0, 0.28, 0],
    scale: [1, 1, 1]
}

if (Utils.isMobileDevice()) {
    params = {
        pos: [10, 50, 0],
        rot: [0, 0, 0],
        scale: [0.6, 0.6, 0.6]
    }
}

const titles = new Titles({
    position: params.pos,
    rotation: params.rot,
    scale: params.scale
});

titlesTextures.mapTitlePlane(titles);

export { titles as default, Titles as titleComponent }