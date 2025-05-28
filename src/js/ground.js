import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'

export class Ground extends Actor {
    constructor(x,y) {
        super({x,y, width: Resources.Ground.width, height: Resources.Ground.height}) //Just do it! 

        this.body.collisionType = CollisionType.Fixed

        this.graphics.use(Resources.Ground.toSprite())
        this.scale = new Vector(0.3, 0.3)
    }
}