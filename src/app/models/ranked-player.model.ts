import { Injectable } from "@angular/core";
import { Match } from "./match.model";
import { PointsEntry } from "./points-entry.model";
import { SpecialEvent } from "./special-event.model";

export interface RankedPlayer {
    id: string;
    UID : number;
    fullname: string;
    points : number;
    picture_url: string;
    matches : Match[];
    events : SpecialEvent[];
    active : boolean;
}


export interface RankedPlayer2 {
    id: string;
    UID : number;
    fullname: string;
    picture_url: string;
    points : PointsEntry[];
    active : boolean;
}

