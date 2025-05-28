import { Actor, Vector, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from './resources.js'

export class Enemy extends Actor {

    #sprite
    #lives

    constructor(x, y) {
        super({ width: Resources.Enemy.width, height: Resources.Enemy.height - 15 }) //Just do it! 

        this.#sprite = Resources.Enemy.toSprite()
        this.graphics.use(this.#sprite)
        this.#lives = 1
        this.#sprite.flipHorizontal = false

        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onInitialize() {
        this.pos = new Vector(-200 + Math.random() * 200, -160)
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
        Resources.Death.play()
        this.actions.fade(0, 1000).callMethod(this.kill())
    }
}