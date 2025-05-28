import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class PowerUp extends Actor {
    #sprite

    constructor() {
        super({ width: Resources.Hat.width, height: Resources.Hat.height }) //Just do it! 
        this.#sprite = Resources.Hat.toSprite()
        this.graphics.use(this.#sprite)

        // this.body.collisionType = CollisionType.Passive

        this.pos = new Vector(700, 700)
    }

    gotHit() {
        this.kill()
    }
}