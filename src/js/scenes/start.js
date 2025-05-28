import { Scene, Label, Font, TextAlign, Keys, Vector, FontUnit, Color, Buttons } from "excalibur"
import { Bg } from '../background.js'

export class StartGameScene extends Scene {

    constructor(engine) {
        super()

        const bg = new Bg()
        this.add(bg)

        const label = new Label({
            text: 'Advocaderaser',
            pos: new Vector(1920 / 2, 1080 / 3 - 20),
            font: new Font({
                family: 'Impact',
                size: 100,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
                color: Color.Black
            })
        })
        this.add(label)

        const label1 = new Label({
            text: 'Druk op enter om door te gaan',
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