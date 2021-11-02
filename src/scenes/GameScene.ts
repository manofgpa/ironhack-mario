import Phaser from 'phaser'
// import bomb from '../../public/images/bomb.png'

export default class GameScene extends Phaser.Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup
  private player?: Phaser.Physics.Arcade.Sprite
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super('hello-world')
  }

  preload() {
    this.load.image('background', 'images/background.png')
    this.load.image('ground', 'images/ground.png')
    this.load.spritesheet('mario', 'images/mariosprites.png', {
      frameWidth: 24,
      frameHeight: 40,
    })
  }

  create() {
    this.add.image(400, 300, 'background')

    this.platforms = this.physics.add.staticGroup()
    const ground = this.platforms.create(
      400,
      700,
      'ground'
    ) as Phaser.Physics.Arcade.Sprite
    ground.setScale(0.8).refreshBody()

    this.player = this.physics.add.sprite(300, 450, 'mario').setScale(2)
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('mario', {
        start: -3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'mario', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 5,
        end: 8,
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
      this.player?.setVelocityX(-160)
      this.player?.anims.play('left', true)
    } else if (this.cursors.right?.isDown) {
      this.player?.setVelocityX(160)
      this.player?.anims.play('right', true)
    } else {
      this.player?.setVelocityX(0)
      this.player?.anims.play('turn')
    }

    if (this.cursors.up?.isDown && this.player?.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }
}
