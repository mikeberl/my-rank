import { Injectable } from "@angular/core";
import { RankedPlayer } from "./ranked-player.model";

export interface Match {

    id : number; // will be 0 by post request / non-0 by get request
    player_id : string; // id of RANKED PLAYER who registered the match
    league_id : string;
    winners: RankedPlayer[]; // id of winners
    losers: RankedPlayer[];
    points: number;
    date: string; //TODO
    was_reported: boolean;
}

export interface MatchNoId {

  player_id : string; // id of RANKED PLAYER who registered the match
  league_id : string;
  winners: RankedPlayer[]; // id of winners
  losers: RankedPlayer[];
  points: number;
  date: string; //TODO
  was_reported: boolean;
}


const MATCHITEMS = [
    {id : 0o1, player_id : 'p1', league_id : 'l1', winners: [], losers: [], points: 15, date : '01-01-2001', was_reported: true}


  ]

    export class MatchItems {
  getResultitem(): Match[] {
    return MATCHITEMS;
  }
}