import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class Coin extends Actor {
    #sprite

    constructor(x, y, scale, opacity, w, h) {
        super({
            x, y,
            width: w,
            height: h
        }) //Just do it! 

        this.#sprite = Resources.Coin.toSprite()
        this.graphics.use(this.#sprite)
        this.scale = new Vector(scale, scale)
        this.#sprite.opacity = opacity
    }

    gotHit() {
        this.kill()
    }

    showCoin() {
        this.#sprite.opacity = 1
    }

}