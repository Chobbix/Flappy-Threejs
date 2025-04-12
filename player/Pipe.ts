import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import { MeshFactory } from "./MeshFactory";

export class Pipe extends MeshFactory {
    private velocity: number;
    private spawnPosition: {
        x: number,
        y: number
    };

    static initializePipe(configuration: { geometry: BoxGeometry, material: MeshPhongMaterial }, spawnPosition: { x: number, y: number }) {
        const pipe = new Pipe();
        pipe.createPipeMesh(configuration)
        pipe.spawnPosition = spawnPosition;
        pipe.mesh.position.x = spawnPosition != null ? spawnPosition.x : 5;
        pipe.mesh.position.y = spawnPosition != null ? spawnPosition.y : 0;
        pipe.velocity = 3;
        return pipe;
    }
    
    move(deltaTime: number) {
        if(this.mesh.position.x < -15) {
            this.mesh.position.x = 10;
            //this.mesh.position.y = Math.random() * (2 - (-2)) + (-2);
        }
        this.mesh.position.x -= (deltaTime * this.velocity);
    }
} 