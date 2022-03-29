import { Injectable } from "@angular/core";

export interface RankedPlayer {
    id: string;
    UID : number;
    fullname: string;
    points : number;
    picture_url: string;
    league_id: string;
}

const RANKEDPLAYERS = [
    { id: 'p1', UID: 1, fullname: 'Michele Berlanda', points: 200, picture_url: '/assets/images/users/1.jpg', league_id: 'l1'},
    { id: 'p2', UID: 2, fullname: 'Piero Magi', points: 1, picture_url: '/assets/images/users/2.jpg', league_id: 'l1'},
    { id: 'p3', UID: 3, fullname: 'Luca Arsev', points: 2000, picture_url: '/assets/images/users/3.jpg', league_id: 'l1'},
    { id: 'p4', UID: 4, fullname: 'Lucia Dandolomea', points: 20, picture_url: '/assets/images/users/4.jpg', league_id: 'l2'},
    { id: 'p5', UID: 1, fullname: 'Asah Moah', points: 200, picture_url: '/assets/images/users/5.jpg', league_id: 'l1'},
    { id: 'p99', UID: 9, fullname: 'ERROR', points: 200, picture_url: '/assets/images/users/6.jpg', league_id: 'l1'}   

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

  getPlayerByUserAndLeague(UID : number, league : string)  {
    var tmp : RankedPlayer = RANKEDPLAYERS[6];
    for (let player of RANKEDPLAYERS) {
        if (player.league_id === league && player.UID === UID) {
            tmp  = player;
            
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
