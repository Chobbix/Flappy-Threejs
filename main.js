import { Pipe } from './player/Pipe';
import { Player } from './player/Player';
import { Configuration } from './setup/Configuration';

const configuration = Configuration.createDefaultConfiguration();
const player = Player.initializePlayer();
configuration.addPlayerToScene(player)

const pipeTemplate = Pipe.initializePipe(null, null);
var pipes = [];

for(let i = 0; i < 5; i++) {
    
    let yPosition = Math.random() * (2 - (-2)) + (-2);
    let xPosition = (i+1)*5; 
    pipes.push(Pipe.initializePipe(pipeTemplate.configuration, { x: xPosition, y: (-3.2) + (yPosition) }))
    pipes.push(Pipe.initializePipe(pipeTemplate.configuration, { x: xPosition, y: ( 3.2) + (yPosition) }))
}

configuration.addPipesToScene(pipes)



function render(time) {
    const deltaTime = configuration.clock.getDelta()

    player.rotate(deltaTime);
    player.fall(deltaTime);
    player.jump(deltaTime);

    pipes.forEach((pipe) => {
        pipe.move(deltaTime);
    })

    configuration.resizeRendererToDisplaySize();
    configuration.renderer.render(configuration.scene, configuration.camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);