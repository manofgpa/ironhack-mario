import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
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
    this.load.tilemapTiledJSON('map', 'map/map.json')
    this.load.image('tiles', 'images/tiles/tiles.png')
  }

  create() {
    this.scene.start('game')
  }
}
