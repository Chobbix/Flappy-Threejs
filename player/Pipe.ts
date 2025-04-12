import { BoxGeometry, MeshPhongMaterial } from "three";
import { MeshFactory } from "./MeshFactory";
import { LIMIT_NEGATIVE_POSITION, SPAWN_POSITION, VELOCITY } from "./PipeConstants";

export class Pipe extends MeshFactory {
    velocity: number;
    id: number;
    spawnPosition: {
        x: number,
        y: number
    };

    static initializePipe(id: number, configuration: { geometry: BoxGeometry, material: MeshPhongMaterial }, spawnPosition: { x: number, y: number }) {
        const pipe = new Pipe();
        pipe.createPipeMesh(configuration)
        pipe.spawnPosition = spawnPosition;
        pipe.mesh.position.x = spawnPosition != null ? spawnPosition.x : 0;
        pipe.mesh.position.y = spawnPosition != null ? spawnPosition.y : 0;
        pipe.velocity = VELOCITY;
        pipe.id = id;
        return pipe;
    }
    
    move(deltaTime: number) {
        this.mesh.position.x -= (deltaTime * this.velocity);
        this.configuration.boundingBox.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld)
    }

    respawn() {
        this.mesh.position.x = SPAWN_POSITION;
    }
} 