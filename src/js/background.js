import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class Bg extends Actor {
    constructor() {
        super() //Just do it! 

        this.graphics.use(Resources.Background.toSprite())
        this.scale = new Vector(0.5, 0.5)
        this.pos = new Vector(1720, -200)
    }
}