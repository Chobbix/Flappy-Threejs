import { BoxGeometry, Mesh, MeshPhongMaterial } from "three"

export class MeshFactory {
    configuration: {
        geometry: BoxGeometry,
        material: MeshPhongMaterial
    };
    mesh: Mesh;

    createPipeMesh(configuration: { geometry: BoxGeometry, material: MeshPhongMaterial }) {
        if(configuration == null) {
            this.configuration = {
                geometry: null,
                material: null
            }
            this.configuration.geometry = new BoxGeometry(.5, 5, .5);
            this.configuration.material = new MeshPhongMaterial({ color: 0x44aa88 });
        }
        else
            this.configuration = configuration;

        this.createMesh();
    }

    createPlayerMesh() {
        this.configuration = {
            geometry: null,
            material: null
        }
        this.configuration.geometry = new BoxGeometry(.5, .5, .5);
        this.configuration.material = new MeshPhongMaterial({ color: 0x44aa88 });
        this.createMesh();
    }

    private createMesh() {
        this.mesh = new Mesh(this.configuration.geometry, this.configuration.material);
    }
}