import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { RankedPlayer, RankedPlayers } from '../models/ranked-player.model';

const RANKEDPLAYERS = [
  { id: 'p1', UID: 1, fullname: 'Michele Berlanda', points: 0, picture_url: '/assets/images/users/1.jpg', league_id: 'l1', matches: []},
  { id: 'p2', UID: 2, fullname: 'Piero Magi', points: 0, picture_url: '/assets/images/users/2.jpg', league_id: 'l1', matches: []},
  { id: 'p3', UID: 3, fullname: 'Luca Arsev', points: 0, picture_url: '/assets/images/users/3.jpg', league_id: 'l1', matches: []},
  { id: 'p4', UID: 4, fullname: 'Lucia Dandolomea', points: 0, picture_url: '/assets/images/users/4.jpg', league_id: 'l2', matches: []},
  { id: 'p5', UID: 1, fullname: 'Asah Moah', points: 0, picture_url: '/assets/images/users/5.jpg', league_id: 'l1', matches: []},
  { id: 'p99', UID: 9, fullname: 'ERROR', points: 0, picture_url: '/assets/images/users/6.jpg', league_id: 'l1', matches: []}   
]

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  all_players : RankedPlayer[] = [];

  constructor(private playerModel : RankedPlayers) {
    //creating some players for testing
    var check_for_testing = localStorage.getItem("PLAYERS");
    if (check_for_testing === undefined) {
      localStorage.setItem("PLAYERS", JSON.stringify(this.getRankedPlayers()));
    }
   /*  var tmp = localStorage.getItem("PLAYERS");
    if (tmp === null) {
      console.log("ERROR: No player found! Impossible");
    }
    else {
      this.all_players = JSON.parse(tmp);
      for (let player of this.all_players) {
        var tmp_player = localStorage.getItem("PLAYER_" + player.id);
        if (tmp_player === null) {
          console.log("No SINGLE player found! Impossible");
        }
      }
    } */
  }

  addMatch(match : Match) {
    console.log("Starting to add a match to every player");
    console.log(match);
    var tmp = localStorage.getItem("PLAYERS");
    if (tmp === null) {
      console.log("ERROR: No player found! Impossible");
      localStorage.setItem("PLAYERS", JSON.stringify(this.getRankedPlayers()));
    }
    else {
      this.all_players = JSON.parse(tmp);
    }
      for (let winner of match.winners) {
        var i = this.all_players.findIndex(x => x = winner);
        if (i != -1) {
          this.all_players[i].matches.push(match);
          this.all_players[i].points = this.all_players[i].points as number  + match.points as number;
          console.log(this.all_players[i]);
        }
      }
      for (let loser of match.losers) {
        console.log("losers");
        console.log(loser);
        var j = this.all_players.findIndex(x => x.id = loser.id);
        console.log(j);
        if (j != -1 && this.all_players[j].league_id === match.league_id) {
          this.all_players[j].matches.push(match);
          this.all_players[j].points = this.all_players[j].points as number  - match.points as number;
          console.log(this.all_players[j]);
        }
      }
      localStorage.setItem("PLAYERS", JSON.stringify(this.all_players));
    // }
    
  }


  getRankedPlayers(): RankedPlayer[] {
    var tmp = localStorage.getItem("PLAYERS");
    if (tmp === null) {
      return RANKEDPLAYERS;
    }
    else {
      return JSON.parse(tmp);
    }
  }

  getRankedPlayersByLeague(league : string) : RankedPlayer[] {
    var players : RankedPlayer[] = [];
    var tmp = localStorage.getItem("PLAYERS");
    if (tmp === null) {
      console.log("ERROR: No player found! Impossible");
      localStorage.setItem("PLAYERS", JSON.stringify(this.getRankedPlayers()));
    }
    else {
      this.all_players = JSON.parse(tmp);
      for (let player of this.all_players) {
          if (player.league_id === league) {
            players.push(player);
          }
      }
      
    }
    return players;
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
