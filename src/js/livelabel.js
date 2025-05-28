import { Actor, Sprite, Vector } from "excalibur"
import { Resources } from './resources.js'

export class LiveLabel extends Actor {

    constructor() {
        super() //Just do it! 
        this.pos = new Vector(100, 30)
        this.scale = new Vector(0.75, 0.75)
    }

    onInitialize(engine) {
        this.sprite = new Sprite({
            image: Resources.Heart,
            sourceView: {
                x: 0, y: 0,
                width: Resources.Heart.width,
                height: Resources.Heart.height
            },
            destSize: {
                width: Resources.Heart.width,
                height: Resources.Heart.height
            }
        })
        this.anchor = Vector.Zero
        this.graphics.use(this.sprite)

        this.showHearts(this.scene.player.lives)
    }

    showHearts(amount) {
        this.sprite.sourceView.width = amount * 105;
        this.sprite.destSize.width = amount * 105;
    }
}