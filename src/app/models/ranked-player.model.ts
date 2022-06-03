import { Injectable } from "@angular/core";
import { PointsEntry } from "./points-entry.model";
import { Event } from "./special-event.model";

/* export interface RankedPlayer {
    id: string;
    UID : number;
    fullname: string;
    points : number;
    picture_url: string;
    events : Event[];
    active : boolean;
} */


export interface RankedPlayer {
    id: string;
    UID : number;
    fullname: string;
    picture_url: string;
    points : PointsEntry[];
    active : boolean;
}

