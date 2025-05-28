import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'

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
    Portal: new ImageSource('images/portal.png')
}


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }