import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over')
  }

  create(data: { title: string }) {
    this.add
      .text(200, 125, 'GAME OVER', {
        fontFamily: 'Quicksand',
        fontSize: '24px',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        padding: { left: 30, right: 30, top: 30, bottom: 30 },
      })
      .setOrigin(0.5, 0.5)
  }
}
