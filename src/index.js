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
var birdImg;
var cursors;
const game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', sky);
  this.load.image("logo", logoImg);
  this.load.image("land", land);
  this.load.spritesheet("bird", bird, { frameWidth: 34, frameHeight: 24 });
}

function create() {
  // this.physics.startSystem(Phaser.Physics.ARCADE);
  this.add.image(400, 300, 'sky');
  birdImg = this.physics.add.sprite(240, 320, 'bird');
  birdImg.body.bounce.y = 0.25;
  birdImg.body.gravity.y = 1500;
  birdImg.body.collideWorldBounds = true;
  platforms = this.physics.add.staticGroup();

  // 112 Is land image height
  landImg = this.add.tileSprite(400, 600 - (112/2), 800, 112, 'land');

  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNames('bird', { start: 0, end: 3 }),
    repeat: -1,
  });
  birdImg.anims.play('fly');
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  landImg.tilePositionX = iter * 100;
  iter += 0.01;
  if (cursors.space.isDown) {   
    birdImg.body.velocity.y = -400;
    birdImg.anims.play('fly');
  }
}
