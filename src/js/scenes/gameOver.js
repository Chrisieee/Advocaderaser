import { Scene, Label, Font, TextAlign, Keys, Vector, FontUnit, Color, Buttons } from "excalibur"
import { Bg } from '../background.js'

export class GameOverScene extends Scene {

    constructor() {
        super()

        const bg = new Bg()
        this.add(bg)

        this.label = new Label({
            text: 'Game Over',
            pos: new Vector(1920 / 2, 1080 / 3 - 20),
            font: new Font({
                family: 'Impact',
                size: 100,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
                color: Color.Black
            })
        })

        this.add(this.label)

        const score = localStorage.getItem("highscore")
        this.highscore = new Label({
            text: `Highscore: ${score}`,
            pos: new Vector(1920 / 2, 1080 / 2 - 60),
            font: new Font({
                family: 'Impact',
                size: 40,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
                color: Color.Black
            })
        })
        this.add(this.highscore)

        const label1 = new Label({
            text: 'Druk op enter om opnieuw te beginnen',
            pos: new Vector(1920 / 2, 1080 / 2 + 50),
            font: new Font({
                family: 'Arial',
                size: 40,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
                color: Color.Black
            })
        })
        this.add(label1)
    }

    onInitialize() {
        const score = localStorage.getItem("highscore")
        this.highscore.text = `Highscore: ${score}`

        if (this.engine.kind === "gameover") {
            this.label.text = 'Game Over'
        }

        if (this.engine.kind === "completed") {
            this.label.text = 'Level completed!'
        }
    }

    onPostUpdate(engine) {
        if (engine.mygamepad) {
            if (engine.mygamepad.isButtonPressed(Buttons.Face1)) {
                engine.loadLevel1()
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.loadLevel1()
        }
    }
}