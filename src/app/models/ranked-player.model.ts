import { Injectable } from "@angular/core";

export interface RankedPlayer {
    id: string;
    fullname: string;
    points : number;
    picture_url: string;
    league_id: string;
}

const RANKEDPLAYERS = [
    { id: 'p1', fullname: 'Michele Berlanda', points: 200, picture_url: '/assets/images/users/1.jpg', league_id: 'l1'},
    { id: 'p2', fullname: 'Piero Magi', points: 1, picture_url: '/assets/images/users/2.jpg', league_id: 'l1'},
    { id: 'p3', fullname: 'Luca Arsev', points: 2000, picture_url: '/assets/images/users/3.jpg', league_id: 'l1'},
    { id: 'p4', fullname: 'Lucia Dandolomea', points: 20, picture_url: '/assets/images/users/4.jpg', league_id: 'l2'},
    { id: 'p5', fullname: 'Asah Moah', points: 200, picture_url: '/assets/images/users/5.jpg', league_id: 'l1'}    

]

@Injectable()
export class RankedPlayers {
  getRankedPlayers(): RankedPlayer[] {
    return RANKEDPLAYERS;
  }

  getRankedPlayersByLeague(league : string) : RankedPlayer[] {
      var tmp : RankedPlayer[] = [];
      for (let player of RANKEDPLAYERS) {
          if (player.league_id === league) {
              tmp.push(player);
          }
      }
      return tmp;
  }

  getSortedPlayersByLeague(league : string) : RankedPlayer[] {
        var tmp : RankedPlayer[] = [];
        for (let player of RANKEDPLAYERS) {
            if (player.league_id === league) {
                tmp.push(player);
            }
        }
        return tmp;
    }
}
