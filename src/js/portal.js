import { Actor, Vector, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'


export class Portal extends Actor {
    #sprite
    active

    constructor(x, y) {
        super({
            x, y,
            width: Resources.Portal.width,
            height: Resources.Portal.height
        }) //Just do it! 

        this.#sprite = Resources.Portal.toSprite()
        this.graphics.use(this.#sprite)
        this.graphics.opacity = 0.5

        this.active = false
    }

    activate() {
        this.graphics.opacity = 1
        this.active = true
    }

}