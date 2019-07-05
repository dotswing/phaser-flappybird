import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import sky from "./assets/ocean_sky.png"
import land from "./assets/land.png"
import bird from "./assets/bird.png";
import building from "./assets/building.png";

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

var landImg;
var buildingImg;
var iter = 0;
const game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', sky);
  this.load.image("logo", logoImg);
  this.load.image("land", land);
  this.load.image("building", building);
  this.load.spritesheet("bird", bird, { frameWidth: 34, frameHeight: 24 });
}

function create() {
  // Scene
  this.add.tileSprite(400, 300, 800, 600, 'sky');
  landImg = this.add.tileSprite(400, 600 - ( 112 / 2 ), 800, 112, 'land');
  buildingImg = this.add.tileSprite(400, 600 - (( 109 / 2 ) + 112 ), 800, 109, 'building')


  const bird = this.physics.add.sprite(240, 320, 'bird', 0);

  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNames('bird', { start: 0, end: 3 }),
    repeat: -1,
  });

  bird.anims.play('fly');
}

function update() {
  landImg.tilePositionX = iter * 100;
  buildingImg.tilePositionX = iter * 30;
  iter += 0.01;
}
