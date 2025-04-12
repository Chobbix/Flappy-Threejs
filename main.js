import { Pipe } from './player/Pipe';
import { SAFE_BREACH, SPACE_BETWEEN_PIPES } from './player/PipeConstants';
import { PipeService } from './player/PipeService';
import { Player } from './player/Player';
import { PlayerService } from './player/PlayerService';
import { Configuration } from './setup/Configuration';

const configuration = Configuration.createDefaultConfiguration();
const player = Player.initializePlayer();
configuration.addPlayerToScene(player)

var pipes = PipeService.initilizePipes()
configuration.addPipesToScene(pipes)

function render(time) {
    const deltaTime = configuration.clock.getDelta()

    PlayerService.render(deltaTime, player);
    PipeService.render(deltaTime, pipes, player);

    configuration.resizeRendererToDisplaySize();
    configuration.renderer.render(configuration.scene, configuration.camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);