import { Actor, ScreenElement } from "excalibur"
import { Scorelabel } from './scorelabel.js'
import { CoinLabel } from './coinlabel.js'
import { LiveLabel } from './livelabel.js'

export class UI extends ScreenElement {

    #scoreLabel
    liveLabel
    #coinsPickedUp
    coinlabel

    constructor() {
        super() //Just do it! 

        this.#coinsPickedUp = 0

        this.liveLabel = new LiveLabel()
        this.addChild(this.liveLabel)

        this.#scoreLabel = new Scorelabel(860, 40)
        this.addChild(this.#scoreLabel)
        this.#scoreLabel.text = `Score: 0`

        this.coinlabel = new CoinLabel(1700, 60)
        this.addChild(this.coinlabel)
    }

    showScore(score) {
        this.#scoreLabel.text = `Score: ${score}`
    }

    addCoin() {
        this.#coinsPickedUp++
        let coinPosition = 100

        if (this.#coinsPickedUp > 1) {
            coinPosition = 100 + this.#coinsPickedUp * 30
        }

        const coin = new Coin(coinPosition, 100, 0.5)
        this.addChild(coin)
    }
}