import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, Color, Clock, OrthographicCamera, Camera } from 'three'
import { Player } from '../src/player/Player';
import { Pipe } from '../src/pipe/Pipe';
import { CameraInterface } from './CameraInterface';

export class Configuration {
    public canvas: Element;
    public score: Element;
    public renderer: WebGLRenderer;
    public scene: Scene;
    public cameras: Map<number,CameraInterface>;
    public light: DirectionalLight;
    public clock: Clock;

    static createDefaultConfiguration() {
        const configuration = new Configuration();
        configuration.createCanvas('#canva');
        configuration.createScoreAttachment('#score')
        configuration.createReloadButton();
        configuration.createRenderer();
        configuration.createScene();
        configuration.createCameras();
        configuration.createLight();
        configuration.createClock();

        configuration.scene.add(configuration.light);
        return configuration;
    }

    private createCanvas(id: string) {
        this.canvas = document.querySelector(id);
    }

    private createScoreAttachment(id: string) {
        this.score = document.querySelector(id);
    }

    private createRenderer() {
        this.renderer = new WebGLRenderer({ 
            antialias: true, 
            canvas: this.canvas 
        });
    }

    private createScene() {
        this.scene = new Scene();
        //this.scene.fog = new Fog('lightblue', 1, 4);
        this.scene.background = new Color('lightblue');
    }

    private createCameras() {
        var visibleSize = { width: window.innerWidth, height: window.innerHeight};
        this.cameras = new Map();
        this.cameras.set(1, {
            isActive: true,
            camera: new PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100)
        });
        this.cameras.set(2, {
            isActive: false,
            camera: new OrthographicCamera(visibleSize.width / - 250, visibleSize.width / 250, visibleSize.height / 250, visibleSize.height / - 250, 1, 1000 )
        });

        this.cameras.forEach(element => {
            element.camera.position.z = 5;
        });
        // console.log(this.cameras)
        
        document.addEventListener('keypress', (e) => {
            switch(e.code) {
                case 'Digit1':{
                    if(this.cameras.get(1).isActive != true) {
                        this.cameras.forEach(element => {
                            if(element.isActive == true) element.isActive = false;
                        });
                        this.cameras.get(1).isActive = true;
                    }
                }
                break;
                case 'Digit2':{
                    if(this.cameras.get(2).isActive != true) {
                        this.cameras.forEach(element => {
                            if(element.isActive == true) element.isActive = false;
                        });
                        this.cameras.get(2).isActive = true;
                    }
                }
                break;
            }
        });
    }

    private createLight() {
        this.light = new DirectionalLight(0xFFFFFF, 5);
        this.light.position.set(-1, 2, 4);
    }

    private createClock() {
        this.clock = new Clock();
    }

    public resizeRendererToDisplaySize() {
        const canvas = this.renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = Math.floor(canvas.clientWidth * pixelRatio);
        const height = Math.floor(canvas.clientHeight * pixelRatio);
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            this.renderer.setSize(width, height, false);
            if(this.cameras.get(1).isActive == true) {
                const perspectiveCamera = this.cameras.get(1).camera as PerspectiveCamera
                perspectiveCamera.updateProjectionMatrix();
            }
        }
        return needResize;
    }

    public addPlayerToScene(player: Player) {
        this.scene.add(player.mesh);
    }

    public addPipesToScene(pipes: Pipe[]) {
        pipes.forEach((pipe)=> {
            this.scene.add(pipe.mesh);
        })
    }

    public updateScore(player: Player) {
        this.score.textContent = player.scorePoints.toString();
    }
    
    public createReloadButton() {
        document.addEventListener('keypress', (e) => {
            switch(e.code) {
                case 'KeyR':
                    location.reload();
            }
        });
    }
    
    public renderCamera() {
        let camera: Camera = null 
        this.cameras.forEach(element => {
            if(element.isActive == true) camera = element.camera;
        });
        return camera;
    }
}