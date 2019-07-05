import Phaser from 'phaser';
import sky from './assets/ocean_sky.png'
import land from './assets/land.png'
import pipe from './assets/pipe.png'
import bird from './assets/bird.png';
import building from './assets/building.png';
import gameover from './assets/gameover.png';

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
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
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
var buildingImg;
var iter = 0;
var birdImg;
var cursors;
var platforms;
var scoreGroup;
var score = 0;
var gameOver = false;
var replay = document.getElementById('replay')

const game = new Phaser.Game(config);
var self;
var keyboards;
var player;
var emptySpace;

function preload() {
  self = this;
  replay.style.display = "none"

  this.load.image('sky', sky);
  this.load.image('land', land);
  this.load.image('building', building);
  this.load.spritesheet('bird', bird, { frameWidth: 34, frameHeight: 24 });

  this.load.image('font_big_0', require('./assets/font_big_0.png'));
  this.load.image('font_big_1', require('./assets/font_big_1.png'));
  this.load.image('font_big_2', require('./assets/font_big_2.png'));
  this.load.image('font_big_3', require('./assets/font_big_3.png'));
  this.load.image('font_big_4', require('./assets/font_big_4.png'));
  this.load.image('font_big_5', require('./assets/font_big_5.png'));
  this.load.image('font_big_6', require('./assets/font_big_6.png'));
  this.load.image('font_big_7', require('./assets/font_big_7.png'));
  this.load.image('font_big_8', require('./assets/font_big_8.png'));
  this.load.image('font_big_9', require('./assets/font_big_9.png'));

  this.load.image('gameover', require('./assets/gameover.png'));
  this.load.image('pipe', pipe);
}

function create() {
  this.add.tileSprite(400, 300, 800, 600, 'sky');
  landImg = this.add.tileSprite(400, 600 - ( 112 / 2 ), 800, 112, 'land');
  buildingImg = this.add.tileSprite(400, 600 - (( 109 / 2 ) + 112 ), 800, 109, 'building');
  scoreGroup = this.add.group();
  
  birdImg = this.physics.add.sprite(400, 100, 'bird');
  birdImg.body.bounce.y = 0.25;
  birdImg.body.gravity.y = 1000;
  birdImg.body.collideWorldBounds = true;

  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNames('bird', { start: 0, end: 3 }),
    repeat: -1,
  });
  birdImg.anims.play('fly');

  this.input.keyboard.addKey('SPACE').on('down', function () {
    if (gameOver) {
      return
    } 
    score++;
    showScore(score);
  });

  upperPipes = this.physics.add.group({
    key: 'pipe',
    repeat: 1,
    setXY: { x: 600, y: 0, stepX: 200 },
    setScale: {x : 1, y: -100}
  })

  lowerPipes = this.physics.add.group({
    key: 'pipe',
    repeat: 1,
    setXY: { x: 600, y: 500, stepX: 200 },
    setScale: {x : 1, y: 100}
  });

  emptySpace = this.physics.add

  lowerPipes.children.iterate(function (child) {
    child.setVelocityX(-60.6)
  })
  upperPipes.children.iterate(function (child) {
    child.setVelocityX(-60.6)
  })
  
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568).setScale(30, 5).refreshBody();
  
  landImg = this.add.tileSprite(400, 600 - ( 112 / 2 ), 800, 112, 'land');

  this.physics.add.collider(birdImg, platforms);

  this.physics.add.overlap(birdImg, lowerPipes, endGame, null, this)
  this.physics.add.overlap(birdImg, upperPipes, endGame, null, this)

  cursors = this.input.keyboard.createCursorKeys();

  showScore(score);
}

function update() {
  if (gameOver) {
    return
  }

  landImg.tilePositionX = iter * 100;
  buildingImg.tilePositionX = iter * 30;
  iter += 0.01;
  
  if (cursors.space.isDown) {   
    birdImg.body.velocity.y = -400;
    birdImg.anims.play('fly');
  }

  if (birdImg.body.touching.down) {
    birdImg.anims.stop('fly');
    endGame()
    restart(this)
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

function endGame() {
  gameOver = true;
  lowerPipes.children.iterate(function (child) {
    child.setVelocityX(0)
  })
  upperPipes.children.iterate(function (child) {
    child.setVelocityX(0)
  })
  self.add.image(400, 200, 'gameover');
}

function randomLowerPipe() {
  return Math.floor(Math.random() * 125) + 100
}

function randomUpperPipe() {
  return (Math.floor(Math.random() * 125) + 100) * -1
}

function showScore(score) {
  scoreGroup.clear(true);
  const digits = score.toString().split('');
  for(var i = 0; i < digits.length; i++) {
    scoreGroup.create(20 + (i * 25), 30, 'font_big_' + digits[i]);
  }
}

function restart(phaser) {
  replay.style.display = "flex"
  replay.addEventListener("click", (e) =>{ 
      gameOver = false;
      phaser.scene.restart()
  })
}