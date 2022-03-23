import { Injectable } from "@angular/core";

export interface Result {

    id : number; // will be 0 by post request / non-0 by get request
    user_id : string; // id of user who registered the match
    league_id : string;
    winners: string[]; // id of winners
    losers: string[];
    points: number;
    date: string; //TODO
    was_reported: boolean;
}


const RESULTITEMS = [
    {id : '001', user_id : 'p1', league_id : 'l1', winners: [], losers: [], points: 15, },
    {id : '002', name: 'Roundnet Padova', city: 'Padova', max_players : 120, admin_id : 'p1', picture_url: '/assets/images/users/2.jpg', is_open: true},
    {id : '003', name: 'Roundnet Graz', city: 'Graz', max_players : 30, admin_id : 'p2', picture_url: '/assets/images/users/3.jpg', is_open: true},
    {id : '004', name: 'Roundnet Monaco', city: 'Monaco', max_players : 10, admin_id : 'p3', picture_url: '/assets/images/users/4.jpg', is_open: true},
    {id : '005', name: 'Roundnet Milano', city: 'Milano', max_players : 20, admin_id : 'p4', picture_url: '/assets/images/users/5.jpg', is_open: false},    

]

@Injectable()
export class ResultItems {
  getResultitem(): Result[] {
    return RESULTITEMS;
  }
}