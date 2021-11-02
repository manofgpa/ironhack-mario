import Phaser from 'phaser'
import Game from './scenes/Game'
import Preloader from './scenes/Preloader'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
    },
  },
  scene: [Preloader, Game],
  scale: {
    zoom: 1.5,
  },
}

export default new Phaser.Game(config)
