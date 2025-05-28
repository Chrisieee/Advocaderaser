import { Actor, Vector, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { friendsGroup } from "./collisiongroup.js"

export class Hat extends Actor {
    sprite
    durability
    #opacity

    constructor() {
        super({
            width: Resources.Hat.width,
            height: Resources.Hat.height,
            collisionGroup: friendsGroup
        }) //Just do it! 

        this.sprite = Resources.Hat.toSprite()
        this.graphics.use(this.sprite)
        this.#opacity = 1
        this.durability = 3

        this.pos = new Vector(20, -275)
    }

    use() {
        this.durability--
        console.log(this.sprite.opacity)
        this.#opacity = this.#opacity - 0.33
        this.actions.fade(this.#opacity, 1000)
    }

    death() {
        this.kill()
    }

}