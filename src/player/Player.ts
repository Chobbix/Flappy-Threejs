import { MeshFactory } from "../MeshFactory";
import { FALL_ACCELERATION, FLOOR_LIMIT, INITIAL_POSITION, JUMP_ACCELERATION, JUMP_VELOCITY } from "./PlayerConstants";

export class Player extends MeshFactory {
    public isAlive: boolean;
    public inputJump: {
        actualPress: boolean,
        previousPress: boolean
    }
    public fallAtributes: {
        velocity: number,
        acceleration: number
    }
    public scorePoints: number

    static initializePlayer() {
        const player = new Player();
        player.isAlive = true;
        player.scorePoints = 0;
        player.inputJump = {
            actualPress: false,
            previousPress: false
        };
        player.fallAtributes = {
            velocity: 5,
            acceleration: 0
        }
        
        document.addEventListener('keypress', (e) => {
            switch(e.code) {
                case 'Space':
                    player.inputJump.actualPress = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            switch(e.code) {
                case 'Space':
                    player.inputJump.actualPress = false;
            }
        });

        player.createPlayerMesh();
        player.mesh.position.x = INITIAL_POSITION

        return player;
    }

    public jump(deltaTime: number) {
        if(this.inputJump.actualPress == true && this.inputJump.previousPress == false) {
            if(this.fallAtributes.acceleration == 0)
                this.mesh.position.y = FLOOR_LIMIT - (-.1)

            this.fallAtributes.acceleration = JUMP_ACCELERATION ;
            this.mesh.position.y += deltaTime * (this.fallAtributes.acceleration * JUMP_VELOCITY)
        }
        this.inputJump.previousPress = this.inputJump.actualPress;
    }

    public rotate(deltaTime: number) {
        // this.mesh.rotation.z -= deltaTime * (this.fallAtributes.acceleration * JUMP_VELOCITY);
        this.mesh.rotation.x += deltaTime*2;
        this.mesh.rotation.y += deltaTime*2;
    }

    public fall(deltaTime: number) {
        if(this.mesh.position.y > FLOOR_LIMIT) {
            this.fallAtributes.acceleration += FALL_ACCELERATION
            this.mesh.position.y -= (deltaTime * (this.fallAtributes.acceleration * this.fallAtributes.velocity));
        }
        else {
            this.fallAtributes.acceleration = 0;
            this.mesh.position.y = FLOOR_LIMIT
        }
    }

    public die() {
        this.mesh.position.x = -30;
        this.mesh.visible = false;
    }

    public score() {
        this.scorePoints++;
    }

    public updateBoundingBox() {
        this.configuration.boundingBox.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld)
    }
}