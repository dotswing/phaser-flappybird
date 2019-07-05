import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import sky from "./assets/sky.png"
import land from "./assets/land.png"
import bird from "./assets/bird.png";

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
  this.load.spritesheet("bird", bird, { frameWidth: 34, frameHeight: 24 });
}

function create() {
  this.add.image(400, 300, 'sky');
  const bird = this.physics.add.sprite(240, 320, 'bird', 0);

  platforms = this.physics.add.staticGroup();

  // 112 Is land image height
  landImg = this.add.tileSprite(400, 600 - (112/2), 800, 112, 'land');

  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNames('bird', { start: 0, end: 3 }),
    repeat: -1,
  });

  bird.anims.play('fly');
}

function update() {
  landImg.tilePositionX = iter * 100;
  iter += 0.01;
}
