import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, Color, Clock } from 'three'
import { Player } from '../player/Player';
import { Pipe } from '../player/Pipe';

export class Configuration {
    public canvas: Element;
    public renderer: WebGLRenderer;
    public scene: Scene;
    public camera: PerspectiveCamera;
    public light: DirectionalLight;
    public clock: Clock;

    static createDefaultConfiguration() {
        const configuration = new Configuration();
        configuration.createCanvas('#c');
        configuration.createRenderer();
        configuration.createScene();
        configuration.createCamera();
        configuration.createLight();
        configuration.createClock();

        configuration.scene.add(configuration.light);
        return configuration;
    }

    private createCanvas(id: string) {
        this.canvas = document.querySelector(id);
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

    private createCamera() {
        var visibleSize = { width: window.innerWidth, height: window.innerHeight};
        this.camera = new PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);
        this.camera.position.z = 5;
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
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
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
}