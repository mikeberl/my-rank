import { Injectable } from "@angular/core";
import { Match } from "./match.model";

export interface RankedPlayer {
    id: string;
    UID : number;
    fullname: string;
    points : number;
    picture_url: string;
    matches : Match[];
    active : boolean;
}


