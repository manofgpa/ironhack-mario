import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    this.load.image('logo', 'images/logo.svg')
    this.load.image('1player', 'images/1player.png')
    this.load.image('2player', 'images/2player.png')
    this.load.image('mush', 'images/mush.png')
    this.load.audio('theme', 'sounds/maintheme.mp3')
    this.load.audio('gameover', 'sounds/gameover.mp3')
    this.load.audio('worldclear', 'sounds/worldclear.mp3')
    this.load.audio('areaclear', 'sounds/areaclear.mp3')
    this.load.audio('down', 'sounds/down.mp3')
    this.load.audio('gompakill', 'sounds/gompakill.mp3')
    this.load.audio('jump', 'sounds/jump.mp3')

    this.load.image('tiles', 'resources/map/tiles.png')
    this.load.image('tiles2', 'resources/map/tiles2.png')
    this.load.tilemapTiledJSON('mainMap', 'resources/map/map.json')
    this.load.image('background', 'images/background.png')
    this.load.spritesheet('mario', 'images/smallMario.png', {
      frameWidth: 34,
      frameHeight: 34,
    })
    this.load.spritesheet('monty', 'images/enemies/monty.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.atlas(
      'atlas',
      'images/mario-atlas.png',
      'resources/mario-atlas.json'
    )
    this.load.tilemapTiledJSON('map', 'map/map.json')
    this.load.image('tiles', 'images/tiles/tiles.png')
  }

  create() {
    this.scene.start('menu')
  }
}
