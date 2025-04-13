import { PipeService } from './src/pipe/PipeService';
import { Player } from './src/player/Player';
import { PlayerService } from './src/player/PlayerService';
import { Configuration } from './setup/Configuration';

const configuration = Configuration.createDefaultConfiguration();
const player = Player.initializePlayer();
configuration.addPlayerToScene(player)

var pipes = PipeService.initilizePipes()
configuration.addPipesToScene(pipes)

function render(time) {
    const deltaTime = configuration.clock.getDelta()

    PipeService.render(deltaTime, pipes, player);
    PlayerService.render(deltaTime, player);

    configuration.updateScore(player);
    configuration.resizeRendererToDisplaySize();
    configuration.renderer.render(configuration.scene, configuration.camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);