import { Actor, Vector } from "excalibur"
import { Coin } from './coin.js'

export class CoinLabel extends Actor {

    #coins

    constructor(x, y) {
        super() //Just do it! 
        this.pos = new Vector(x, y)

        this.#coins = [
            new Coin(0, 10, 0.75, 0.25, 0, 0),
            new Coin(80, 10, 0.75, 0.25, 0, 0),
            new Coin(160, 10, 0.75, 0.25, 0, 0)
        ]

        for (let coin of this.#coins) {
            this.addChild(coin)
        }
    }

    addCoin(coin) {
        this.#coins[coin - 1].showCoin()
    }
}