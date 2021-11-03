import Phaser from 'phaser'
import Monty from '../enemies/Monty'
import Mario from '../characters/Mario'
import { gameOptions } from '../config/gameOptions'

export default class Game extends Phaser.Scene {
  private mario!: Mario
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  private enemies?: Phaser.Physics.Arcade.Group

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

    this.mario = this.physics.add.sprite(50, 130, 'mario').setScale(0.7)
    this.mario.setBounce(0.1)

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

    this.anims.create({
      key: 'mario-left',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 4,
        end: 5,
      }),

      frameRate: 10,
      repeat: 1,
    })

    this.anims.create({
      key: 'mario-turn',
      frames: [{ key: 'mario', frame: 4 }],
      frameRate: 20,
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

    this.cursors = this.input.keyboard.createCursorKeys()

    // mario-enemy collision

    this.physics.add.collider(
      this.mario,
      this.enemies,
      function (mario, enemy) {
        if (enemy.body.touching.up && mario.body.touching.down) {
          mario.body.velocity.y = -gameOptions.marioJump
        } else {
          // any other way to collide on an enemy will restart the game
          // game.state.start('PlayGame')
        }
      },
      undefined,
      this
    )
  }

  // private handlemarioLizardCollision(
  //   obj1: Phaser.GameObjects.GameObject,
  //   obj2: Phaser.GameObjects.GameObject
  // ) {
  //   const mounty = obj2 as Monty

  //   const dx = this.mario.x - mounty.x
  //   const dy = this.mario.y - mounty.y

  //   const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

  //   this.mario.handleDamage(dir)

  //   sceneEvents.emit('mario-health-changed', this.mario.health)

  //   if (this.mario.health <= 0) {
  //     this.marioLizardsCollider?.destroy()
  //   }
  // }

  update() {
    if (!this.cursors) {
      return
    }
    // Movements

    // Jump
    if (this.cursors.up?.isDown && this.mario?.body.blocked.down) {
      this.mario.setVelocityY(gameOptions.marioJump)
    }

    // Enemy
  }
}
