import { PointsEntry } from "./points-entry.model";
import { RankedPlayer } from "./ranked-player.model";

export interface EventElement {
    player : RankedPlayer;
    points : number;
}

export enum EventType {
    INTERNAL_TOURNAMENT,
    EXTERNAL_TOURNAMENT,
    SPECIAL_EVENT,
    MATCH,
    BONUS,
    MALUS,
    OTHER
}

export interface SpecialEvent  {
    id : number; // will be 0 by post request / non-0 by get request
    league_id : string;
    points : EventElement[];
    date: Date; //TODO
    was_reported: boolean;
    event_type : EventType;
}

export interface SpecialEvent2  {
    id : number; // will be 0 by post request / non-0 by get request
    league_id : string;
    points : PointsEntry[];
    date: Date; //TODO
    was_reported: boolean;
    event_type : EventType;
}