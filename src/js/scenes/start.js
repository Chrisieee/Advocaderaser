import { Scene, Label, Font, TextAlign, Keys, Vector, FontUnit, Color, Buttons } from "excalibur"
import { Bg } from '../background.js'
import { Resources } from '../resources.js'

export class StartGameScene extends Scene {

    constructor(engine) {
        super()

        const bg = new Bg()
        this.add(bg)

        const label = new Label({
            text: 'Advocaderaser',
            pos: new Vector(1920 / 2, 1080 / 3 - 40),
            font: Resources.HeadFont.toFont({
                unit: FontUnit.Px,
                size: 150,
                textAlign: TextAlign.Center,
                color: Color.Black
            })
        })
        this.add(label)

        this.label1 = new Label({
            text: 'Druk op enter om door te gaan',
            pos: new Vector(1920 / 2, 1080 / 2 + 50),
            font: Resources.BasicFont.toFont({
                size: 50,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
                color: Color.Black
            })
        })
        this.add(this.label1)
    }

    onInitialize(engine) {
        if (engine.mygamepad) {
            this.label1.text = 'Druk op kruisje om door te gaan'
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