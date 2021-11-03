import Phaser from 'phaser'
import Monty from '../enemies/Monty'
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
    this.load.spritesheet('monty', 'images/enemies/monty.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.spritesheet('mario', 'images/smallMario.png', {
      frameWidth: 34,
      frameHeight: 34,
    })
    this.load.tilemapTiledJSON('map', 'map/map.json')
    this.load.image('tiles', 'images/tiles/tiles.png')
  }

  create() {
    // Map creation
    const map = this.make.tilemap({ key: 'mainMap' })
    const tileset = map.addTilesetImage('tiles', 'tiles')
    const tileset2 = map.addTilesetImage('tiles2', 'tiles2')

    const skyLayer = map.createLayer('sky', tileset2)
    const mainLayer = map.createLayer('main', tileset)
    const groundLayer = map.createLayer('ground', tileset)

    // Map collision
    mainLayer.setCollisionByProperty({ collides: true })
    skyLayer.setCollisionByProperty({ collides: true })
    groundLayer.setCollisionByProperty({ collides: true })

    // Collision debug
    const debugGraphics = this.add.graphics().setAlpha(0.75)
    groundLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    })

    this.cameras.main.setZoom(1)
    this.cameras.main.centerOn(0, 0)

    this.platforms = this.physics.add.staticGroup()

    this.player = this.physics.add.sprite(50, 130, 'mario').setScale(0.7)
    this.player.setBounce(0.1)

    // Enemies
    const enemies = this.physics.add.group({
      classType: Monty,
      createCallback: go => {
        const montyGo = go as Monty
        montyGo.body.onCollide = true
      },
    })
    enemies.get(400, 230, 'monty')

    this.physics.add.collider(this.player, mainLayer)
    this.physics.add.collider(this.player, groundLayer)
    this.physics.add.collider(this.player, enemies)

    this.physics.add.collider(enemies, mainLayer)
    this.physics.add.collider(enemies, groundLayer)

    // Camera
    this.cameras.main.setBounds(0, 0, 3384, 500)
    this.cameras.main.startFollow(this.player, false, 1, 0)

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

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (!this.cursors) {
      return
    }
    // Movements
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

    // Jump
    if (this.cursors.up?.isDown && this.player?.body.blocked.down) {
      this.player.setVelocityY(-330)
    }
  }
}
