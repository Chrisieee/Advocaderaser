import { Actor, CollisionType, CompositeCollider, Shape, Vector } from "excalibur"

export class Border extends Actor {
    constructor() {
        super()

        let landscape = new CompositeCollider([
            //Shape.Edge(new Vector(0, 0), new Vector(0, -1080)),
            Shape.Edge(new Vector(0, -1080), new Vector(0, 0)),
            Shape.Edge(new Vector(3440, -1080), new Vector(3440, 0)),
            Shape.Edge(new Vector(0, -1080), new Vector(3440, -1080))
        ])
        this.body.collisionType = CollisionType.Fixed
        this.collider.set(landscape)
        this.pos = new Vector(0, 0)
    }
}