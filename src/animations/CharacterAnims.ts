import Phaser from 'phaser'

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
  // animations
  anims.create({
    key: 'mario-right',
    repeat: -1,
    frames: anims.generateFrameNumbers('mario', {
      start: 2,
      end: 5,
    }),
  })

  anims.create({
    key: 'mario-left',
    repeat: -1,
    frames: anims.generateFrameNumbers('mario', {
      start: 2,
      end: 5,
    }),
  })

  anims.create({
    key: 'mario-idle',
    frames: anims.generateFrameNumbers('mario', {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  })

  anims.create({
    key: 'mario-up',
    frames: anims.generateFrameNumbers('mario', {
      start: 6,
      end: 6,
    }),
    repeat: -1,
  })

  anims.create({
    key: 'mario-die',
    frames: anims.generateFrameNumbers('mario', {
      start: 1,
      end: 1,
    }),
    repeat: -1,
  })
}

export { createCharacterAnims }
