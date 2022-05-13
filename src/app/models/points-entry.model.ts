import { Match } from "./match.model";
import { RankedPlayer } from "./ranked-player.model";

export interface PointsEntry {
    id : number;
    player : RankedPlayer;
    match : Match;
    points : number;
}
