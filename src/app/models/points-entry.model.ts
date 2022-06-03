import { RankedPlayer } from "./ranked-player.model";
import { Event } from "./special-event.model";

export interface PointsEntry {
    id : number;
    player : RankedPlayer;
    match : Event | null;
    points : number;
}
