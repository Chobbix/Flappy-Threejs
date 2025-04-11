import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

export class Player {
    public isAlive: boolean;
    public inputJump: {
        actualPress: boolean,
        previousPress: boolean
    }
    public cube: Mesh;
    private jumpVelocity: number = 200;

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

        player.createCube();
        return player;
    }
    
    private createCube() {
        const geometry = new BoxGeometry(.5, .5, .5);
        const material = new MeshPhongMaterial({ color: 0x44aa88 });
        this.cube = new Mesh(geometry, material);
        this.cube.position.x = 0
    }

    public jump(deltaTime: number) {
        if(this.inputJump.actualPress == true && this.inputJump.previousPress == false) {
            if(this.fallAtributes.acceleration == 0)
                this.cube.position.y = -3.1

            this.fallAtributes.acceleration = -1 ;
            this.cube.position.y += deltaTime * (this.fallAtributes.acceleration * this.fallAtributes.velocity)
        }
        this.inputJump.previousPress = this.inputJump.actualPress;
    }

    public rotate(deltaTime: number) {
        this.cube.rotation.x += deltaTime*2;
        this.cube.rotation.y += deltaTime*2;
    }

    public fall(deltaTime: number) {
        if(this.cube.position.y > -3.2) {
            this.fallAtributes.acceleration += 0.016
            this.cube.position.y -= (deltaTime * (this.fallAtributes.acceleration * this.fallAtributes.velocity));
        }
        else {
            this.fallAtributes.acceleration = 0;
            this.cube.position.y = -3.2
        }
    }
}