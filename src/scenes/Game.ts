import Phaser from 'phaser'
// import bomb from '../../public/images/bomb.png'

export default class Game extends Phaser.Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup
  private player?: Phaser.Physics.Arcade.Sprite
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super('game')
  }

  preload() {
    this.load.image('background', 'images/background.png')
    this.load.spritesheet('mario', 'images/smallMario.png', {
      frameWidth: 34,
      frameHeight: 34,
    })
    this.load.tilemapTiledJSON('map', 'map/map.json')
    this.load.image('tiles', 'images/tiles/tiles.png')
  }

  create() {
    const map = this.make.tilemap({ key: 'mainMap' })
    const tileset = map.addTilesetImage('tiles', 'tiles')
    const tileset2 = map.addTilesetImage('tiles2', 'tiles2')

    map.createLayer('sky', tileset2)
    map.createLayer('main', tileset)

    this.platforms = this.physics.add.staticGroup()
    const ground = this.platforms.create(
      400,
      700,
      'ground'
    ) as Phaser.Physics.Arcade.Sprite
    ground.setScale(0.8).refreshBody()

    this.player = this.physics.add.sprite(300, 450, 'mario').setScale(1)
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 4,
        end: 5,
      }),

      frameRate: 10,
      repeat: 1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'mario', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 4,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 6,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 1,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.physics.add.collider(this.player, this.platforms)

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (!this.cursors) {
      return
    }

    if (this.cursors.left?.isDown) {
      this.player?.setFlipX(true)
      this.player?.setVelocityX(-160)
      this.player?.anims.play('left', true)
    } else if (this.cursors.right?.isDown) {
      this.player?.setFlipX(false)
      this.player?.setVelocityX(160)
      this.player?.anims.play('right', true)
    } else if (this.cursors.up?.isDown) {
      this.player?.anims.play('up', true)
    } else {
      this.player?.setVelocityX(0)
      this.player?.anims.play('turn')
    }

    if (this.cursors.up?.isDown && this.player?.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }
}
