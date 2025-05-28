import { Actor, Vector, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from './resources.js'

export class Enemy extends Actor {

    #sprite
    #lives

    constructor() {
        super({ width: Resources.Enemy.width, height: Resources.Enemy.height - 15 }) //Just do it! 

        this.#sprite = Resources.Enemy.toSprite()
        this.graphics.use(this.#sprite)
        this.pos = new Vector(0, -160)
        this.#lives = 1
        // this.vel = new Vector(-100, 0)

        this.#sprite.flipHorizontal = false

        this.body.collisionType = CollisionType.Passive
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onPostUpdate() {
        if (this.pos.x <= -180) {
            this.vel = new Vector(100, 0)
            this.#sprite.flipHorizontal = false
        }
        else if (this.pos.x >= 180) {
            this.vel = new Vector(-100, 0)
            this.#sprite.flipHorizontal = true
        }
        else if (this.vel.x === 0) {
            this.vel = new Vector(100, 0)
        }
    }

    gotHit() {
        this.actions.fade(0, 1000).callMethod(this.kill())
    }
}