import Phaser from 'phaser'
import { gameOptions } from '../config/gameOptions'

// import { sceneEvents } from '../events/EventsCenter'

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      mario(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): Mario
    }
  }
}

enum HealthState {
  IDLE,
  DEAD,
}

export default class Mario extends Phaser.Physics.Arcade.Sprite {
  // private healthState = HealthState.IDLE

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)

    this.anims.play('mario-idle')
  }

  // handleDie(dir: Phaser.Math.Vector2) {
  //   this.healthState = HealthState.DEAD
  //   this.anims.play('mario-die')
  //   this.setVelocity(0, 0)
  // }

  // private throwKnife() {
  //   if (!this.knives) {
  //     return
  //   }

  //   const knife = this.knives.get(
  //     this.x,
  //     this.y,
  //     'knife'
  //   ) as Phaser.Physics.Arcade.Image
  //   if (!knife) {
  //     return
  //   }

  //   const parts = this.anims.currentAnim.key.split('-')
  //   const direction = parts[2]

  //   const vec = new Phaser.Math.Vector2(0, 0)

  //   switch (direction) {
  //     case 'up':
  //       vec.y = -1
  //       break

  //     case 'down':
  //       vec.y = 1
  //       break

  //     default:
  //     case 'side':
  //       if (this.scaleX < 0) {
  //         vec.x = -1
  //       } else {
  //         vec.x = 1
  //       }
  //       break
  //   }
  // }

  preUpdate(t: number, dt: number) {
    // super.preUpdate(t, dt)
    // switch (this.healthState) {
    //   case HealthState.IDLE:
    //     break
    // }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    // if (this.healthState === HealthState.DEAD) {
    //   return
    // }

    if (!cursors) {
      return
    }

    const leftDown = cursors.left?.isDown
    const rightDown = cursors.right?.isDown
    const upDown = cursors.up?.isDown
    const downDown = cursors.down?.isDown

    if (leftDown) {
      this.setFlipX(true)
      this.setVelocityX(-gameOptions.playerSpeed)
      this.anims.play('mario-left', true)
    } else if (rightDown) {
      this.setFlipX(false)
      this.setVelocityX(gameOptions.playerSpeed)
      this.anims.play('mario-right', true)
    } else if (upDown) {
      this.anims.play('mario-up', true)
    } else {
      this.setVelocityX(0)
      this.anims.play('mario-idle')
    }
    // Jump
    if (upDown && this.body.blocked.down) {
      this.setVelocityY(gameOptions.playerJump)
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'mario',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    var sprite = new Mario(this.scene, x, y, texture, frame).setScale(0.6)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    )

    sprite.body.setSize(sprite.width * 0.5, sprite.height * 1)

    return sprite
  }
)
