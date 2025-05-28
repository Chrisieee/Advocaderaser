import '../css/style.css'
import { Engine, Vector, DisplayMode, SolverStrategy, FadeInOut, Color } from "excalibur"
import { ResourceLoader } from './resources.js'
import { StartGameScene } from './scenes/start.js'
import { Level1Scene } from './scenes/level1.js'
import { GameOverScene } from './scenes/gameOver.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1920,
            height: 1080,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            suppressPlayButton: false,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0, 8000),
            }
        })
        this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        let transitions = {
            in: new FadeInOut({ duration: 200, direction: 'in', color: Color.Black }),
            out: new FadeInOut({ duration: 200, direction: 'out', color: Color.Black })
        }

        this.add('start', new StartGameScene())
        this.add('level1', { scene: new Level1Scene(), transitions })
        this.add('gameover', { scene: new GameOverScene(), transitions })
        this.kind = "test"

        this.loadStart()
    }

    loadStart() {
        console.log("test")
        this.goToScene('start')
    }

    loadLevel1() {
        console.log("level 1")
        this.goToScene('level1')
    }

    gameOver(score) {
        if (localStorage.getItem("highscore")) {
            const highscore = localStorage.getItem("highscore")

            if (highscore < score) {
                localStorage.setItem("highscore", score)
            }
        } else {
            localStorage.setItem("highscore", score)
        }

        this.goToScene('gameover')
        this.kind = "gameover"
    }

    complete() {
        this.goToScene('gameover')
        this.kind = "completed"
    }
}

new Game()