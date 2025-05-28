import { ImageSource, Loader, ImageWrapping, FontSource, Sound } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.jpg'),
    Player: new ImageSource('images/Advocado.png'),
    Ground: new ImageSource('images/Ondergrond.png'),
    Enemy: new ImageSource('images/toast.png'),
    Hat: new ImageSource('images/hat.png'),
    Projectile: new ImageSource('images/pit.png'),
    Coin: new ImageSource('images/Coin.png'),
    Platform: new ImageSource('images/Platform.png'),
    Heart: new ImageSource('images/hearts.png', { wrapping: ImageWrapping.Repeat }),
    Portal: new ImageSource('images/portal.png'),

    HeadFont: new FontSource('fonts/LondrinaShadow-Regular.ttf', 'heads'),
    BasicFont: new FontSource('fonts/IndieFlower-Regular.ttf', 'basic'),

    Level: new Sound('sounds/level.mp3'),
    Jump: new Sound('sounds/jump.mp3'),
    Death: new Sound('sounds/death.mp3'),
    CoinSound: new Sound('sounds/coin.mp3'),
    Item: new Sound('sounds/item.mp3'),
    Shoot: new Sound('sounds/shoot.mp3'),
    PortalSound: new Sound('sounds/portal.mp3'),
    GameOver: new Sound('sounds/game-over.mp3')
}


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }