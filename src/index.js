import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import sky from "./assets/sky.png"
import land from "./assets/land.png"
import pipe from "./assets/pipe.png"
import bird from "./assets/bird.png";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var lowerPipes;
var upperPipes;

var landImg;
var iter = 0;
const game = new Phaser.Game(config);
var keyboards
var player
var emptySpace

function preload() {
  this.load.image('sky', sky);
  this.load.image("logo", logoImg);
  this.load.image("land", land);
  this.load.image("pipe", pipe)
  this.load.spritesheet("bird", bird, { frameWidth: 34, frameHeight: 24 });
}

function create() {
  keyboards = this.input.keyboard.createCursorKeys()
  this.add.image(400, 300, 'sky');
  player = this.physics.add.sprite(240, 320, 'bird', 0);
  player.setGravityY(300)
  upperPipes = this.physics.add.group({
    key: 'pipe',
    repeat: 5,
    setXY: { x: 400, y: 0, stepX: 200 },
    setScale: {x : 1, y: -100}
  })

  lowerPipes = this.physics.add.group({
    key: 'pipe',
    repeat: 5,
    setXY: { x: 400, y: 500, stepX: 200 },
    setScale: {x : 1, y: 100}
  });

  emptySpace = this.physics.add

  lowerPipes.children.iterate(function (child) {
    child.setVelocityX(-60.6)
    console.log(child)
  })
  upperPipes.children.iterate(function (child) {
    child.setVelocityX(-60.6)
  })

  // pipes.create(400, 500, 'pipe').setScale(1, 100).refreshBody()
  // pipes.setVelocityX(-10)
  // 112 Is land image height
  landImg = this.add.tileSprite(400, 600 - (50), 800, 100, 'land');

  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNames('bird', { start: 0, end: 3 }),
    repeat: -1,
  });

  player.anims.play('fly');

  // this.physics.add.overlap(player, landImg, dead, null, this)
  this.physics.add.overlap(player, lowerPipes, dead, null, this)
  
}

function update() {
  landImg.tilePositionX = iter * 100;
  iter += 0.01;
  if (keyboards.space.isDown) {
    player.setVelocityY(-100)
  }

  lowerPipes.children.iterate(function (child) {
    let posX = child.x
    if (posX < -50) {
      child.x = 850
      child.scaleY = randomLowerPipe()
    }
  })
  upperPipes.children.iterate(function (child) {
    let posX = child.x
    if (posX < -50) {
      child.x = 850
      child.scaleY = randomUpperPipe()
    }
  })
}

function dead(player, other) {
  console.log('You dead')
}

function randomChong() {
  return Math.floor(Math.random() * 400) + 100
}

function randomLowerPipe() {
  return Math.floor(Math.random() * 125) + 100
}

function randomUpperPipe() {
  return (Math.floor(Math.random() * 125) + 100) * -1
}
