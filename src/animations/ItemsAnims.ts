import Phaser from 'phaser'

const createItemsAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'rotate',
    frames: anims.generateFrameNames('atlas', {
      prefix: 'mario-atlas_',
      start: 6,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  })
}

export { createItemsAnims }
