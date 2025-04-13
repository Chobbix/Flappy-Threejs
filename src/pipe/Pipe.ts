import { BoxGeometry, MeshPhongMaterial } from "three";
import { MeshFactory } from "../MeshFactory";
import { SPAWN_X_POSITION, VELOCITY } from "./PipeConstants";

export class Pipe extends MeshFactory {
    velocity: number;
    id: number;
    spawnPosition: {
        x: number,
        y: number
    };
    isScorePipe: boolean;

    static initializePipe(id: number, configuration: { geometry: BoxGeometry, material: MeshPhongMaterial }, spawnPosition: { x: number, y: number }) {
        const pipe = new Pipe();
        pipe.createPipeMesh(configuration)
        pipe.spawnPosition = spawnPosition;
        pipe.mesh.position.x = spawnPosition != null ? spawnPosition.x : 0;
        pipe.mesh.position.y = spawnPosition != null ? spawnPosition.y : 0;
        pipe.velocity = VELOCITY;
        pipe.id = id;
        pipe.isScorePipe = false;
        return pipe;
    }

    static initializeScorePipe(id: number, configuration: { geometry: BoxGeometry, material: MeshPhongMaterial }, spawnPosition: { x: number, y: number }) {
        if(configuration == null)
            configuration = { geometry: new BoxGeometry(.025, 1.9, .5), material: new MeshPhongMaterial({ color: 0xff0000 }) };

        const pipe = this.initializePipe(id, configuration, spawnPosition);
        pipe.isScorePipe = true;
        pipe.mesh.visible = false;
        return pipe;
    }
    
    move(deltaTime: number) {
        this.mesh.position.x -= (deltaTime * this.velocity);
        this.configuration.boundingBox.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld)
    }

    respawn() {
        this.mesh.position.x = SPAWN_X_POSITION;
    }

    remove() {
        this.mesh.position.y += 10;
        this.configuration.boundingBox.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld)
    }
} 