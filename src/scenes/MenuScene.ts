import Phaser from 'phaser'
import '../characters/Mario'

export default class Menu extends Phaser.Scene {
  private mario?: Phaser.Physics.Arcade.Sprite

  constructor() {
    super('menu')
  }

  create() {
    // Map creation
    const map = this.make.tilemap({ key: 'mainMap' })
    const tileset = map.addTilesetImage('tiles', 'tiles')
    const tileset2 = map.addTilesetImage('tiles2', 'tiles2')

    const skyLayer = map.createLayer('sky', tileset2)
    const mainLayer = map.createLayer('main', tileset)
    const groundLayer = map.createLayer('ground', tileset)

    // Logo

    this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height / 3,
        'logo'
      )
      .setScale(0.2)

    // Buttons

    let singlePlayerButton = this.add
      .text(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2 + 30,
        '1 PLAYER GAME',
        { fontFamily: 'SuperMario256' }
      )
      .setOrigin(0.5)

    let multiplePlayerButton = this.add
      .text(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2 + 50,
        '2 PLAYER GAME',
        { fontFamily: 'SuperMario256' }
      )
      .setOrigin(0.5)

    let hoverMush = this.add.sprite(100, 100, 'mush')
    hoverMush.setScale(0.5)
    hoverMush.setVisible(false)

    singlePlayerButton.setInteractive()

    singlePlayerButton.on('pointerover', () => {
      hoverMush.setVisible(true)
      hoverMush.x = singlePlayerButton.x - 70
      hoverMush.y = singlePlayerButton.y
    })
    singlePlayerButton.on('pointerout', () => {
      hoverMush.setVisible(false)
    })
    singlePlayerButton.on('pointerup', () => {
      this.scene.start('game')
    })

    multiplePlayerButton.setInteractive()

    multiplePlayerButton.on('pointerover', () => {
      hoverMush.setVisible(true)
      hoverMush.x = multiplePlayerButton.x - 70
      hoverMush.y = multiplePlayerButton.y
    })
    multiplePlayerButton.on('pointerout', () => {
      hoverMush.setVisible(false)
    })
    multiplePlayerButton.on('pointerup', () => {
      this.scene.start('game')
    })

    // Map collision
    mainLayer.setCollisionByProperty({ collides: true })
    skyLayer.setCollisionByProperty({ collides: true })
    groundLayer.setCollisionByProperty({ collides: true })

    this.mario = this.add.mario(100, 220, 'mario')

    this.physics.add.collider(this.mario, groundLayer)
  }
}
