import Phaser from 'phaser'

class Coin {
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.coins = this.scene.physics.add.group({
      immovable: true,
      allowGravity: false,
    })

    const coinObjects = this.scene.map.getObjectLayer('coin').objects

    for (const coin of coinObjects) {
      this.coins.create(coin.x, coin.y, 'atlas').setOrigin(0).setDepth(-1)
    }
  }

  collideWith(gameObject) {
    this.scene.physics.add.overlap(
      this.coins,
      gameObject,
      this.collect,
      null,
      this
    )

    return this
  }

  update() {
    for (const coin of this.coins.children.entries) {
      coin.play('rotate', true)
    }
  }

  // collect() {
  //   for (const coin of this.coins.children.entries) {
  //     if (!coin.body.touching.none) {
  //       coin.body.setEnable(false)

  //       this.scene.tweens.add({
  //         targets: coin,
  //         ease: 'Power1',
  //         scaleX: 0,
  //         scaleY: 0,
  //         duration: 200,
  //         onComplete: () => coin.destroy(),
  //       })
  //     }
  //   }
  // }
}

export default Coin
