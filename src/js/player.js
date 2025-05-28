import { Actor, Vector, Keys, CollisionType, DegreeOfFreedom, Axes, Buttons } from "excalibur"
import { Resources } from './resources.js'
import { Enemy } from './enemy.js'
import { PowerUp } from './powerUp.js'
import { Hat } from './hat.js'
import { Projectile } from './projectile.js'
import { Coin } from './coin.js'
import { Ground } from './ground.js'
import { Platform } from './platform.js'
import { Portal } from './portal.js'
import { friendsGroup } from "./collisiongroup.js"

export class Player extends Actor {
    #sprite
    lives
    #powerUp
    hat
    score
    coins
    #isOnGround

    constructor() {
        super({
            width: Resources.Player.width - 100,
            height: Resources.Player.height,
            collisionType: CollisionType.Active,
            collisionGroup: friendsGroup
        }) //Just do it! 

        this.#sprite = Resources.Player.toSprite()
        this.graphics.use(this.#sprite)
        this.lives = 3
        this.score = 0
        this.coins = 0
        this.#powerUp = false
        this.pos = new Vector(100, 500)
        this.#isOnGround = true
        this.graphics.opacity = 1

        this.body.mass = 3
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onInitialize(engine) {
        this.events.on("collisionstart", (e) => this.#hitSomething(e))
        engine.input.pointers.primary.on('down', (e) => this.#shoot(e))
    }

    onPostUpdate(engine, delta) {
        let xspeed = 0

        if (engine.mygamepad) {
            if (engine.mygamepad.isButtonPressed(Buttons.Face1) && this.#isOnGround) {
                console.log("test jump")
                this.#jump(delta)
            }
            if (engine.mygamepad.getAxes(Axes.LeftStickX) < -0.5) {
                xspeed = -500
                this.#sprite.flipHorizontal = true
                if (this.#powerUp === true) {
                    this.hat.sprite.flipHorizontal = true
                    this.hat.pos = new Vector(-15, -140)
                }
            } else if (engine.mygamepad.getAxes(Axes.LeftStickX) > 0.5) {
                xspeed = 500
                this.#sprite.flipHorizontal = false
                if (this.#powerUp === true) {
                    this.hat.sprite.flipHorizontal = false
                    this.hat.pos = new Vector(15, -140)
                }
            }
            if (engine.mygamepad.wasButtonPressed(Buttons.Face3)) {
                this.#shoot()
            }
        }

        if (engine.input.keyboard.isHeld(Keys.A)) {
            xspeed = -500
            this.#sprite.flipHorizontal = true
            if (this.#powerUp === true) {
                this.hat.sprite.flipHorizontal = true
                this.hat.pos = new Vector(-15, -140)
            }
        }
        if (engine.input.keyboard.isHeld(Keys.D)) {
            xspeed = 500
            this.#sprite.flipHorizontal = false
            if (this.#powerUp === true) {
                this.hat.sprite.flipHorizontal = false
                this.hat.pos = new Vector(15, -140)
            }
        }
        this.vel.x = xspeed

        if (engine.input.keyboard.wasPressed(Keys.Space) && this.#isOnGround) {
            this.#jump(delta)
        }

        if (this.pos.y > 1080) {
            this.#death()
        }
    }

    #hitSomething(e) {
        if (e.other.owner instanceof Enemy) {
            if (this.vel.y > 0 && this.pos.y > e.other.owner.pos.y) {
                e.other.owner.gotHit()
                this.addScore("enemy")
            } else {
                this.#gotHit()
            }
        } else if (e.other.owner instanceof PowerUp) {
            e.other.owner.gotHit()
            this.#pickUpPowerUp()
        } else if (e.other.owner instanceof Coin) {
            e.other.owner.gotHit()
            this.addScore("coin")
            this.coins++
            this.scene.ui.coinlabel.addCoin(this.coins)
            if (this.coins === 3) {
                this.scene.portal.activate()
            }
        } else if (e.other.owner instanceof Ground || e.other.owner instanceof Platform) {
            this.#isOnGround = true
        } else if (e.other.owner instanceof Portal && e.other.owner.active === true) {
            this.actions.fade(0, 500).callMethod(this.scene.engine.complete())
        }
    }

    #gotHit() {
        if (this.#powerUp === true) {
            this.hat.kill()
            this.#powerUp = false
        } else {
            this.lives--
            this.scene.ui.liveLabel.showHearts(this.lives)
            if (this.lives === 0) {
                this.actions.fade(0, 500).callMethod(() => this.#death())
            }
        }
    }

    #pickUpPowerUp() {
        this.#powerUp = true
        this.hat = new Hat()
        this.addChild(this.hat)
    }

    #jump(delta) {
        console.log(this.vel.y)
        this.body.applyLinearImpulse(new Vector(0, -150 * delta))
        this.#isOnGround = false
        console.log("is gesprongen")
    }

    #shoot() {
        if (this.#powerUp === true) {
            const projectile = new Projectile()
            projectile.pos = this.pos.clone()

            if (this.#sprite.flipHorizontal === true) {
                projectile.way = 1
            } else {
                projectile.way = 0
            }

            this.scene.add(projectile)
            this.hat.use()

            if (this.hat.durability === 0) {
                this.hat.death()
                this.#powerUp = false
            }
        }

    }

    addScore(kind) {
        if (kind === "enemy") {
            this.score = this.score + 30
        } else if (kind === "coin") {
            this.score = this.score + 10
        }

        this.scene.ui.showScore(this.score)
    }

    #death(e) {
        this.kill()
        this.scene.engine.gameOver(this.score)
    }
}