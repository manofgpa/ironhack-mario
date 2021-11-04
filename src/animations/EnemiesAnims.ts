import Phaser from 'phaser'

const createEnemiesAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'monty-right',
    repeat: -1,
    frameRate: 10,
    frames: anims.generateFrameNumbers('monty', {
      start: 0,
      end: 0,
    }),
  })

  anims.create({
    key: 'monty-left',
    frameRate: 10,
    frames: anims.generateFrameNumbers('monty', {
      start: 0,
      end: 0,
    }),
  })

  anims.create({
    key: 'monty-die',
    frames: anims.generateFrameNumbers('monty', {
      start: 2,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  })
}

export { createEnemiesAnims }
