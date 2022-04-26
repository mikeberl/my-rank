import { Injectable } from "@angular/core";
import { Match } from "./match.model";

export interface RankedPlayer {
    id: string;
    UID : number;
    fullname: string;
    points : number;
    picture_url: string;
    matches : Match[];
}

const RANKEDPLAYERS = [
    { id: 'p1', UID: 1, fullname: 'Michele Berlanda', points: 0, picture_url: '/assets/images/users/1.jpg', matches: []},
    { id: 'p2', UID: 2, fullname: 'Piero Magi', points: 0, picture_url: '/assets/images/users/2.jpg', matches: []},
    { id: 'p3', UID: 3, fullname: 'Luca Arsev', points: 0, picture_url: '/assets/images/users/3.jpg', matches: []},
    { id: 'p4', UID: 4, fullname: 'Lucia Dandolomea', points: 0, picture_url: '/assets/images/users/4.jpg', matches: []},
    { id: 'p5', UID: 1, fullname: 'Asah Moah', points: 0, picture_url: '/assets/images/users/5.jpg', matches: []},
    { id: 'p99', UID: 9, fullname: 'ERROR', points: 0, picture_url: '/assets/images/users/6.jpg', matches: []}   

]

@Injectable()
export class RankedPlayers {
  getRankedPlayers(): RankedPlayer[] {
    return RANKEDPLAYERS;
  }
}
