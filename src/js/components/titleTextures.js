import * as WHS from 'whs';

var textures = [
    new THREE.TextureLoader().load("dist/webgl/titles/maintitle.png"),
    new THREE.TextureLoader().load("dist/webgl/titles/title1.png"),
    new THREE.TextureLoader().load("dist/webgl/titles/title2.png"),
    new THREE.TextureLoader().load("dist/webgl/titles/title3.png"),
    new THREE.TextureLoader().load("dist/webgl/titles/title4.png"),
    new THREE.TextureLoader().load("dist/webgl/titles/title5.png")
]
var currentTextureIndex = 0;

var titlePlane = {};

export default class titleTextures {
    constructor() {

        return false;
    }

    static mapTitlePlane(obj) {
        titlePlane = obj;
    }

    static currentTexture() {
        return textures[currentTextureIndex];
    }

    static randomizeTexture() {
        var min = 0;
        var max = textures.length - 1;

        var i = Math.floor(Math.random() * (max - min) + min);
        titlePlane.material.map = textures[i];
    }

    static iterateTexture() {
        if (currentTextureIndex == textures.length) {
            currentTextureIndex = 0;
        }
        titlePlane.material.map = textures[currentTextureIndex];
        currentTextureIndex++;
    }
}