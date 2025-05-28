import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'
import { Enemy } from './enemy.js'
import { friendsGroup } from "./collisiongroup.js"

export class Projectile extends Actor {
    #sprite
    way

    constructor() {
        super({
            width: Resources.Projectile.width,
            height: Resources.Projectile.height,
            collisionGroup: friendsGroup
        }) //Just do it! 

        this.#sprite = Resources.Projectile.toSprite()
        this.graphics.use(this.#sprite)
    }

    onInitialize() {
        this.events.on("extitviewport", (e) => this.kill())
        this.events.on("collisionstart", (e) => this.hitSomething(e))

        if (this.way === 1) {
            this.vel = new Vector(-500, 0)
            this.acc = new Vector(-100, 0)
        } else if (this.way === 0) {
            this.vel = new Vector(500, 0)
            this.acc = new Vector(100, 0)
        }
    }

    hitSomething(e) {
        if (e.other.owner instanceof Enemy) {
            e.other.owner.gotHit()
            this.scene.player.addScore("enemy")
            e.self.owner.kill()
        } else {
            e.self.owner.kill()
        }
    }
}