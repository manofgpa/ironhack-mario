import Phaser from 'phaser'

const createEnemiesAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'monty-right',
    repeat: -1,
    frameRate: 15,
    frames: anims.generateFrameNumbers('monty', {
      start: 0,
      end: 0,
    }),
  })

  anims.create({
    key: 'monty-left',
    repeat: -1,
    frameRate: 15,
    frames: anims.generateFrameNumbers('monty', {
      start: 0,
      end: 0,
    }),
  })

  anims.create({
    key: 'monty-die',
    frames: anims.generateFrameNumbers('monty', {
      start: 0,
      end: 0,
    }),
    frameRate: 15,
    repeat: -1,
  })
}

export { createEnemiesAnims }
