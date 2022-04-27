import { Injectable } from "@angular/core";

export interface League {
    id: string;
    name: string;
    city: string;
    max_players: number;
    admin_id : number;
    picture_url: string;
    active: boolean;
    end: Date;
}

const LEAGUEITEMS = [
    {id : 'l1', name: 'Roundnet BZ', city: 'Bolzano', max_players : 10, admin_id : 1, picture_url: '/assets/images/users/1.jpg', active: true, end: new Date('22/04/2025')},
    {id : 'l2', name: 'Roundnet Padova', city: 'Padova', max_players : 120, admin_id : 2, picture_url: '/assets/images/users/2.jpg', active: true, end: new Date('22/04/2025')},
    {id : 'l3', name: 'Roundnet Graz', city: 'Graz', max_players : 30, admin_id : 1, picture_url: '/assets/images/users/3.jpg', active: true, end: new Date('22/04/2025')},
    {id : 'l4', name: 'Roundnet Monaco', city: 'Monaco', max_players : 10, admin_id : 3, picture_url: '/assets/images/users/4.jpg', active: true, end: new Date('22/04/2025')},
    {id : 'l5', name: 'Roundnet Milano', city: 'Milano', max_players : 20, admin_id : 5, picture_url: '/assets/images/users/5.jpg', active: false, end: new Date('22/04/2025')},  

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
    console.log("ERROR NO LEAGUE FOUND IN getLeagueById");
    return LEAGUEITEMS[0];
  }
}