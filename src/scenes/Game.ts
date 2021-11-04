import Phaser from 'phaser'
import Monty from '../enemies/Monty'
import '../characters/Mario'

import Coin from '../items/Coins'
import { gameOptions } from '../config/gameOptions'
import { createCharacterAnims } from '../animations/CharacterAnims'
import { createEnemiesAnims } from '../animations/EnemiesAnims'
import { createItemsAnims } from '../animations/ItemsAnims'
export default class Game extends Phaser.Scene {
  private mario?: Phaser.Physics.Arcade.Sprite
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  private enemies?: Phaser.Physics.Arcade.Group

  constructor() {
    super('game')
  }

  preload() {}

  create() {
    this.sound.stopAll()
    this.sound.play('theme', {
      loop: true,
      volume: 0.5,
    })

    createCharacterAnims(this.anims)
    createEnemiesAnims(this.anims)
    createItemsAnims(this.anims)

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
    // const debugGraphics = this.add.graphics().setAlpha(0.75)
    // groundLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // })

    this.mario = this.add.mario(100, 220, 'mario')

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
    this.enemies.get(680, 230, 'monty')
    this.enemies.get(690, 230, 'monty')
    this.enemies.get(800, 230, 'monty')
    this.enemies.get(1250, 230, 'monty')
    this.enemies.get(2120, 230, 'monty')
    this.enemies.get(2050, 230, 'monty')
    this.enemies.get(2335, 230, 'monty')
    this.enemies.get(2450, 230, 'monty')
    this.enemies.get(2550, 230, 'monty')
    this.enemies.get(2650, 230, 'monty')
    this.enemies.get(2800, 230, 'monty')

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
        if (enemy.body.touching.left || enemy.body.touching.right) {
          mario.handleDie()

          this.scene.start('game-over', { title: 'GAME OVER' })
          return
        } else if (enemy.body.touching.up && mario.body.touching.down) {
          enemy.handleDie()
          this.sound.play('gompakill', { volume: 1 })
          mario.jump()
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
    console.log(this.mario.x)

    // Movements
    if (this.mario) {
      this.mario.update(this.cursors, this.sound)

      if (this.mario.y > 250) {
        this.scene.start('game-over', { title: 'GAME OVER' })
      }

      if (this.mario.x > 3191 && this.mario.x < 3192) {
        this.sound.stopAll()
        this.sound.play('areaclear')
      }
    }
  }
}
