import { Box3, BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from "three"

export class MeshFactory {
    configuration: {
        geometry: BoxGeometry,
        material: MeshPhongMaterial,
        boundingBox: Box3
    };
    mesh: Mesh;

    createPipeMesh(configuration: { geometry: BoxGeometry, material: MeshPhongMaterial }) {
        if(configuration == null) {
            this.configuration = {
                geometry: null,
                material: null,
                boundingBox: null,
            }
            this.configuration.geometry = new BoxGeometry(.5, 5, .5);
            this.configuration.material = new MeshPhongMaterial({ color: 0x44aa88 });
            this.configuration.boundingBox = new Box3(new Vector3(), new Vector3());
        }
        else
            this.configuration = {...configuration, boundingBox: new Box3(new Vector3(), new Vector3())};

        this.createMesh();
    }

    createPlayerMesh() {
        this.configuration = {
            geometry: null,
            material: null,
            boundingBox: null
        }
        this.configuration.geometry = new BoxGeometry(.5, .5, .5);
        this.configuration.material = new MeshPhongMaterial({ color: 0xfce435 });
        this.configuration.boundingBox = new Box3(new Vector3(), new Vector3());
        this.createMesh();
    }

    private createMesh() {
        this.mesh = new Mesh(this.configuration.geometry, this.configuration.material);
        this.configuration.boundingBox.setFromObject(this.mesh);
    }
}