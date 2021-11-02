import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    this.load.image('tiles', 'resources/map/tiles.png')
    this.load.image('tiles2', 'resources/map/tiles2.png')
    this.load.tilemapTiledJSON('mainMap', 'resources/map/map.json')
  }

  create() {
    this.scene.start('game')
  }
}
