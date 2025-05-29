import { Scene, BoundingBox } from "excalibur"
import { Bg } from '../background.js'
import { Player } from '../player.js'
import { Ground } from '../ground.js'
import { PowerUp } from '../powerUp.js'
import { UI } from '../ui.js'
import { Platform } from '../platform.js'
import { Border } from '../border.js'
import { Portal } from '../portal.js'

export class Level1Scene extends Scene {

  portal
  player
  ui

  constructor(engine) {
    super()
  }

  onActivate(context) {
    this.clear()
    this.resetScene()
  }

  resetScene() {
    let border = new Border()
    this.add(border)

    this.bg = new Bg()
    this.add(this.bg)

    for (let i = 0; i < 2; i++) {
      const ground = new Ground(i * 575, 965)
      this.add(ground)
    }

    for (let i = 0; i < 2; i++) {
      const ground = new Ground(1500 + i * 575, 965)
      this.add(ground)
    }

    for (let i = 0; i < 2; i++) {
      const ground = new Ground(3000 + i * 575, 965)
      this.add(ground)
    }

    const powerUp = new PowerUp()
    this.add(powerUp)

    const platform = new Platform(1000, 525)
    this.add(platform)

    const platform1 = new Platform(1700, 245)
    this.add(platform1)

    const platform2 = new Platform(2500, 525)
    this.add(platform2)

    this.portal = new Portal(3300, 700)
    this.add(this.portal)

    this.player = new Player()
    this.add(this.player)

    this.camera.strategy.lockToActor(this.player)
    this.camera.strategy.limitCameraBounds(new BoundingBox(0, -1080, 3440, 1080))

    this.ui = new UI()
    this.add(this.ui)
  }
}

