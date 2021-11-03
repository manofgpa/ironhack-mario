import Phaser from 'phaser'

enum Direction {
  LEFT,
  RIGHT,
}

export default class Monty extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.RIGHT
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)

    scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision,
      this
    )
  }

  private handleTileCollision(
    go: Phaser.GameObjects.GameObject,
    tile: Phaser.Tilemaps.Tile
  ) {
    if (go !== this) {
      return
    }
    if (go.body.blocked.right || go.body.blocked.left) {
      const newDirection = Phaser.Math.Between(0, 1)
      this.direction = newDirection
    }
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt)

    const speed = 50

    switch (this.direction) {
      case Direction.LEFT:
        this.setVelocity(-speed, 0)
        break
      case Direction.RIGHT:
        this.setVelocity(speed, 0)
        break
    }
  }
}
