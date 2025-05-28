import { Vector, Label, FontUnit, Color } from "excalibur"
import { Resources } from './resources.js'

export class Scorelabel extends Label {

    constructor(x, y) {

        super({
            text: 'Score: 0',
            pos: new Vector(x, y),
            font: Resources.HeadFont.toFont({
                unit: FontUnit.Px,
                size: 100,
                color: Color.Black
            })
        })
    }

}