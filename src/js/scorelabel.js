import { Actor, Vector, Label, Font, FontUnit, Color } from "excalibur"

export class Scorelabel extends Label {

    constructor(x, y) {

        super({
            text: 'Score: 0',
            pos: new Vector(x, y),
            font: new Font({
                family: 'Impact',
                size: 54,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
    }

}