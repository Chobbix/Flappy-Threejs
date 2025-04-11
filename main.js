import { Player } from './player/Player';
import { Configuration } from './setup/Configuration';

const configuration = Configuration.createDefaultConfiguration();
const player = Player.initializePlayer();
configuration.addPlayerToScene(player.cube)


function render(time) {
    const deltaTime = configuration.clock.getDelta()

    player.rotate(deltaTime);
    player.fall(deltaTime);
    player.jump(deltaTime);

    configuration.resizeRendererToDisplaySize();
    configuration.renderer.render(configuration.scene, configuration.camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);