import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over')
  }

  create(data: { title: string }) {
    this.sound.stopAll()
    this.sound.play('gameover')
    this.add
      .text(200, 125, 'GAME OVER', {
        fontFamily: 'SuperMario256',
        fontSize: '24px',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        padding: { left: 30, right: 30, top: 30, bottom: 30 },
      })
      .setOrigin(0.5, 0.5)

    let playAgain = this.add
      .text(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2 + 80,
        'PLAY AGAIN',
        {
          fontFamily: 'SuperMario256',
          color: '#FFFFFF',
        }
      )
      .setOrigin(0.5)

    let hoverMush = this.add.sprite(100, 100, 'mush')
    hoverMush.setScale(0.5)
    hoverMush.setVisible(false)

    playAgain.setInteractive()

    playAgain.on('pointerover', () => {
      hoverMush.setVisible(true)
      hoverMush.x = playAgain.x - 70
      hoverMush.y = playAgain.y
    })
    playAgain.on('pointerout', () => {
      hoverMush.setVisible(false)
    })
    playAgain.on('pointerup', () => {
      this.scene.start('game')
    })
  }
}
