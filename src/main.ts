import Phaser from 'phaser'
import Game from './scenes/Game'
import Preloader from './scenes/Preloader'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 400,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
    },
  },
  scene: [Preloader, Game],
  scale: {
    zoom: 3,
  },
}

export default new Phaser.Game(config)
