import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import sky from "./assets/sky.png"
import land from "./assets/land.png"

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var platforms;

var landImg;
var iter = 0;
const game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', sky);
  this.load.image("logo", logoImg);
  this.load.image("land", land);
}

function create() {
  this.add.image(400, 300, 'sky');


  platforms = this.physics.add.staticGroup();

  // 112 Is land image height
  landImg = this.add.tileSprite(400, 600 - (112/2), 800, 112, 'land');
}

function update() {
  landImg.tilePositionX = iter * 100;
  iter += 0.01;
}
