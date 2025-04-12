import { MeshFactory } from "./MeshFactory";

export class Player extends MeshFactory {
    public isAlive: boolean;
    public inputJump: {
        actualPress: boolean,
        previousPress: boolean
    }
    private jumpVelocity: number = 5;

    public fallAtributes: {
        velocity: number,
        acceleration: number
    }

    static initializePlayer() {
        const player = new Player();
        player.isAlive = true;
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
        player.mesh.position.x = -5

        return player;
    }

    public jump(deltaTime: number) {
        if(this.inputJump.actualPress == true && this.inputJump.previousPress == false) {
            if(this.fallAtributes.acceleration == 0)
                this.mesh.position.y = -3.1

            this.fallAtributes.acceleration = -1 ;
            this.mesh.position.y += deltaTime * (this.fallAtributes.acceleration * this.jumpVelocity)
        }
        this.inputJump.previousPress = this.inputJump.actualPress;
    }

    public rotate(deltaTime: number) {
        this.mesh.rotation.x += deltaTime*2;
        this.mesh.rotation.y += deltaTime*2;
    }

    public fall(deltaTime: number) {
        if(this.mesh.position.y > -3.2) {
            this.fallAtributes.acceleration += 0.016
            this.mesh.position.y -= (deltaTime * (this.fallAtributes.acceleration * this.fallAtributes.velocity));
        }
        else {
            this.fallAtributes.acceleration = 0;
            this.mesh.position.y = -3.2
        }
    }
}