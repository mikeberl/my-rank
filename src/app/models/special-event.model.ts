import { PointsEntry } from "./points-entry.model";
import { RankedPlayer } from "./ranked-player.model";


export enum EventType {
    INTERNAL_TOURNAMENT,
    EXTERNAL_TOURNAMENT,
    SPECIAL_EVENT,
    MATCH,
    BONUS,
    MALUS,
    OTHER
}

export interface Event  {
    id : number; // will be 0 by post request / non-0 by get request
    league_id : string;
    player_id : string;
    points : PointsEntry[];
    date: Date; //TODO
    was_reported: boolean;
    event_type : EventType;
}