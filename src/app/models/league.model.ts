import { Injectable } from "@angular/core";

export interface League {
    id: string;
    name: string;
    city: string;
    max_players: number;
    admin_id : string;
    picture_url: string;
    is_open: boolean;
}

const LEAGUEITEMS = [
    {id : 'l1', name: 'Roundnet BZ', city: 'Bolzano', max_players : 10, admin_id : 'p1', picture_url: '/assets/images/users/1.jpg', is_open: true},
    {id : 'l2', name: 'Roundnet Padova', city: 'Padova', max_players : 120, admin_id : 'p1', picture_url: '/assets/images/users/2.jpg', is_open: true},
    {id : 'l3', name: 'Roundnet Graz', city: 'Graz', max_players : 30, admin_id : 'p2', picture_url: '/assets/images/users/3.jpg', is_open: true},
    {id : 'l4', name: 'Roundnet Monaco', city: 'Monaco', max_players : 10, admin_id : 'p3', picture_url: '/assets/images/users/4.jpg', is_open: true},
    {id : 'l5', name: 'Roundnet Milano', city: 'Milano', max_players : 20, admin_id : 'p4', picture_url: '/assets/images/users/5.jpg', is_open: false},    

]

@Injectable()
export class LeagueItems {
  getLeagueitem(): League[] {
    return LEAGUEITEMS;
  }

  getLeagueById(id: string) : League {
    for (let league of LEAGUEITEMS) {
      if (league.id === id) {
        return league;
      }
    }
    return {id : 'l1', name: 'Roundnet BZ', city: 'Bolzano', max_players : 10, admin_id : 'p1', picture_url: '/assets/images/users/1.jpg', is_open: true};
  }
}