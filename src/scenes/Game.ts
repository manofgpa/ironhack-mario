import Phaser from 'phaser'
import Monty from '../enemies/Monty'
import '../characters/Mario'
import { gameOptions } from '../config/gameOptions'

export default class Game extends Phaser.Scene {
  private mario?: Phaser.Physics.Arcade.Sprite
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  private enemies?: Phaser.Physics.Arcade.Group

  constructor() {
    super('game')
  }

  preload() {}

  create() {
    // animations
    this.anims.create({
      key: 'mario-idle',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 0,
        end: 0,
      }),

      frameRate: 15,
      repeat: -1,
    })

    this.anims.create({
      key: 'mario-left',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 2,
        end: 5,
      }),
      frameRate: 15,
      repeat: -1,
    })

    this.anims.create({
      key: 'mario-right',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 4,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'mario-up',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 6,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'mario-die',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 1,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    })

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

    this.mario = this.add.mario(200, 200, 'mario')

    // Enemies
    this.enemies = this.physics.add.group({
      classType: Monty,
      createCallback: go => {
        const montyGo = go as Monty
        montyGo.body.onCollide = true
      },
    })

    this.enemies.get(400, 230, 'monty')
    this.enemies.get(500, 230, 'monty')
    this.enemies.get(800, 230, 'monty')

    this.physics.add.collider(this.mario, mainLayer)
    this.physics.add.collider(this.mario, groundLayer)
    this.physics.add.collider(this.mario, this.enemies)

    this.physics.add.collider(this.enemies, mainLayer)
    this.physics.add.collider(this.enemies, groundLayer)

    // Camera
    this.cameras.main.setBounds(0, 0, 3384, 500)
    this.cameras.main.startFollow(this.mario, false, 1, 0)
    this.cameras.main.setZoom(1)
    this.cameras.main.centerOn(0, 0)

    this.cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(
      this.mario,
      this.enemies,
      function (mario, enemy) {
        if (enemy.body.touching.left || enemy.body.touching.left) {
          console.log('morreu')
        } else if (enemy.body.touching.up && mario.body.touching.down) {
          console.log('matou')
        }
      },
      undefined,
      this
    )
  }

  update() {
    if (!this.cursors || !this.mario) {
      return
    }
    // Movements
    if (this.mario) {
      this.mario.update(this.cursors)
    }
  }
}
