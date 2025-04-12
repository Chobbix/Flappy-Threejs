import { Pipe } from "./Pipe";
import { LIMIT_BACK_COLLISION, LIMIT_FRONT_COLLISION, LIMIT_NEGATIVE_POSITION, SAFE_BREACH, SPACE_BETWEEN_PIPES } from "./PipeConstants";
import { Player } from "../player/Player";

export class PipeService {
    static initilizePipes() {
        const pipeTemplate = Pipe.initializePipe(0, null, null);
        var pipes = [];

        for(let i = 0; i < 5; i++) {
            let yPosition = this.generateRandomPosition()
            let xPosition = (i+1) * SPACE_BETWEEN_PIPES; 
            pipes.push(Pipe.initializePipe(i, pipeTemplate.configuration, { x: xPosition, y: (-SAFE_BREACH) + (yPosition) }))
            pipes.push(Pipe.initializePipe(i, pipeTemplate.configuration, { x: xPosition, y: ( SAFE_BREACH) + (yPosition) }))
        }

        return pipes;
    }

    static generateRandomPosition() {
        return Math.random() * (2 - (-2)) + (-2)
    }

    static render(deltaTime: number, pipes: Pipe[], player: Player) {
        pipes.forEach((pipe) => {
            if(pipe.mesh.position.x < LIMIT_FRONT_COLLISION && pipe.mesh.position.x > LIMIT_BACK_COLLISION) {
                if(pipe.configuration.boundingBox.intersectsBox(player.configuration.boundingBox)){
                    player.die();
                }
            }
            if(pipe.mesh.position.x < LIMIT_NEGATIVE_POSITION) {
                this.findAndRespawnWithPartner(pipes, pipe)
            }
            pipe.move(deltaTime);

        })
    }

    static findAndRespawnWithPartner(pipes: Pipe[], pipe: Pipe) {
        const pipePartner = pipes.find((e) => e.id == pipe.id && e.mesh.position.y != pipe.mesh.position.y)
        let yPosition = this.generateRandomPosition();

        pipePartner.mesh.position.y = (-SAFE_BREACH) + (yPosition)
        pipePartner.respawn()
        pipe.mesh.position.y = ( SAFE_BREACH) + (yPosition)
        pipe.respawn()
    }
}