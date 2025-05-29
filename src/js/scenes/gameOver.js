import { Scene, Label, Font, TextAlign, Keys, Vector, FontUnit, Color, Buttons } from "excalibur"
import { Bg } from '../background.js'
import { Resources } from '../resources.js'

export class GameOverScene extends Scene {

    #label
    #label1
    #highscore

    constructor() {
        super()

        const bg = new Bg()
        this.add(bg)

        this.#label = new Label({
            text: 'Game Over',
            pos: new Vector(1920 / 2, 1080 / 3 - 40),
            font: Resources.HeadFont.toFont({
                unit: FontUnit.Px,
                size: 150,
                textAlign: TextAlign.Center,
                color: Color.Black
            })
        })

        this.add(this.#label)

        const score = localStorage.getItem("highscore")
        this.#highscore = new Label({
            text: `Highscore: ${score}`,
            pos: new Vector(1920 / 2, 1080 / 2 - 70),
            font: Resources.HeadFont.toFont({
                unit: FontUnit.Px,
                size: 75,
                textAlign: TextAlign.Center,
                color: Color.Black
            })
        })
        this.add(this.#highscore)

        this.#label1 = new Label({
            text: 'Druk op enter om opnieuw te beginnen',
            pos: new Vector(1920 / 2, 1080 / 2 + 50),
            font: Resources.BasicFont.toFont({
                size: 50,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
                color: Color.Black
            })
        })
        this.add(this.#label1)
    }

    onInitialize(engine) {
        if (engine.mygamepad) {
            this.#label1.text = 'Druk op kruisje om door te gaan'
        }

        const score = localStorage.getItem("highscore")
        this.#highscore.text = `Highscore: ${score}`

        if (this.engine.kind === "gameover") {
            this.#label.text = 'Game Over'
        }

        if (this.engine.kind === "completed") {
            this.#label.text = 'Level completed!'
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