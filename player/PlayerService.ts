import { Player } from "./Player";

export class PlayerService {
    static render(deltaTime: number, player: Player) {
        player.updateBoundingBox();
        player.rotate(deltaTime);
        player.fall(deltaTime);
        player.jump(deltaTime);
    }
}