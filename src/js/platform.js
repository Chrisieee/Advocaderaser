import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Enemy } from './enemy.js'
import { Coin } from './coin.js'

export class Platform extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Platform.width, height: Resources.Platform.height }) //Just do it! 

        this.graphics.use(Resources.Platform.toSprite())
        this.body.collisionType = CollisionType.Fixed
    }

    onInitialize() {
        const enemy = new Enemy()
        const coin = new Coin(-200 + Math.random() * 200, -100, 0.5, 1, Resources.Coin.width, Resources.Coin.height)
        this.addChild(coin)
        this.addChild(enemy)
    }
}