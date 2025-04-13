import { Configuration } from "../../setup/Configuration";
import { Player } from "./Player";

export class PlayerService {
    static render(deltaTime: number, player: Player, configuration: Configuration) {
        player.updateBoundingBox();
        if(configuration.cameras.get(1).isActive == true)
            player.rotate(deltaTime);
        if(configuration.cameras.get(2).isActive == true){
            player.mesh.rotation.x = 0;
            player.mesh.rotation.y = 0;
        }
        player.fall(deltaTime);
        player.jump(deltaTime);
    }
}