import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { RankedPlayer } from '../models/ranked-player.model';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { SpecialEvent } from '../models/special-event.model';

const RANKEDPLAYERS = [
  { id: 'p1', UID: 1, fullname: 'Michele Berlanda', points: 0, picture_url: '/assets/images/users/1.jpg', matches: [], events: [], active: true},
  { id: 'p2', UID: 2, fullname: 'Piero Magi', points: 0, picture_url: '/assets/images/users/2.jpg', matches: [],events: [], active: true},
  { id: 'p3', UID: 3, fullname: 'Luca Arsev', points: 0, picture_url: '/assets/images/users/3.jpg', matches: [], events: [],active: true},
  { id: 'p4', UID: 4, fullname: 'Lucia Dandolomea', points: 0, picture_url: '/assets/images/users/4.jpg', matches: [], events: [],active: true},
  { id: 'p5', UID: 1, fullname: 'Asah Moah', points: 0, picture_url: '/assets/images/users/5.jpg', matches: [], events: [],active: true},
  { id: 'p99', UID: 9, fullname: 'ERROR', points: 0, picture_url: '/assets/images/users/6.jpg', matches: [], events: [],active: false}   
]

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  all_players : RankedPlayer[] = [];

  constructor(private storage : StorageService,
          private userService : UserService) {
    //creating some players for testing
    var main_user = this.storage.getSelectedUser();
    /* for(let league of main_user.joined_leagues) {
      var check_for_testing = this.storage.getPlayersByLeague(league);
      if (check_for_testing === null) {
        this.storage.savePlayer(league, RANKEDPLAYERS);
      }
    }  */
  }

  addMatch(match : Match) {
    var tmp = this.storage.getPlayersByLeague(match.league_id);
    if (tmp === null) {
      console.log("ERROR: No player found! addMatch");
    }
    else {
      this.all_players = JSON.parse(tmp);
    }
      for (let winner of match.winners) {
        var i = this.all_players.findIndex(x => x.UID === winner.UID);
        if (i != -1) {
          this.all_players[i].matches.push(match);
          this.all_players[i].points = Number(this.all_players[i].points) + Number(match.winned_points);
        }
        else {
          console.log("Impossible to add a new match, winners are not in the league");
        }
      }
      for (let loser of match.losers) {
        var j = this.all_players.findIndex(x => x.UID === loser.UID);
        if (j != -1) { /////////////////////////////////////////////////////////////////////////////////////////
          this.all_players[j].matches.push(match);
          this.all_players[j].points = this.all_players[j].points - match.loosed_points;
        }
        else {
          console.log("Impossible to add a new match, losers are not in the league");
        }
      }
      this.storage.savePlayer(match.league_id, this.all_players);
  }

  addEvent(event : SpecialEvent) {
    var tmp = this.storage.getPlayersByLeague(event.league_id);
    if (tmp === null) {
      console.log("ERROR: No player found! addMatch");
    }
    else {
      this.all_players = JSON.parse(tmp);
    }
    for (let player of event.points) {
      var j = this.all_players.findIndex(x => x.UID === player.player.UID);
        if (j != -1) { /////////////////////////////////////////////////////////////////////////////////////////
          this.all_players[j].events.push(event);
          this.all_players[j].points = Number(this.all_players[j].points) + Number(player.points);
        }
        else {
          console.log("Impossible to add a new match, losers are not in the league");
        }
    }
    this.storage.savePlayer(event.league_id, this.all_players);
  }

/*   modifyMatchPoints(match : Match) {
    var tmp = this.storage.getPlayersByLeague(match.league_id);
    if (tmp === null) {
      console.log("ERROR: No player found! modifyMatch");
    }
    else {
      this.all_players = JSON.parse(tmp);
    }
      for (let winner of match.winners) {
        var i = this.all_players.findIndex(x => x.UID === winner.UID);
        if (i != -1) {
          var j =  this.all_players[i].matches.findIndex(y => y.id === match.id);
          if (j != -1) {
            var point_diff = this.all_players[i].matches[j]
            this.all_players[i].points = Number(this.all_players[i].points) + Number(match.winned_points);

          }
          this.all_players[i].points = Number(this.all_players[i].points) + Number(match.winned_points);
        }
        else {
          console.log("Impossible to add a new match, winners are not in the league");
        }
      }
      for (let loser of match.losers) {
        var j = this.all_players.findIndex(x => x.UID === loser.UID);
        if (j != -1) { /////////////////////////////////////////////////////////////////////////////////////////
          this.all_players[j].matches.push(match);
          this.all_players[j].points = this.all_players[j].points - match.loosed_points;
        }
        else {
          console.log("Impossible to add a new match, losers are not in the league");
        }
      }
      this.storage.savePlayer(match.league_id, this.all_players);

  } */

  getRankedPlayersByLeague(league : string) : RankedPlayer[] {
    var players : RankedPlayer[] = [];
    var tmp = this.storage.getPlayersByLeague(league);
    if (tmp === null) {
      console.log("ERROR: No player found! getRankedPlayersByLeague");
    }
    else {
      this.all_players = JSON.parse(tmp);
      for (let player of this.all_players) {
          //if (player.league_id === league) {
            players.push(player);
          //}
      }
      
    }
    players.sort((a,b) => {
      return b.points - a.points;
    });
    return players;
}

getPlayers(): RankedPlayer[] {
  return RANKEDPLAYERS;
}

getPlayerByUserAndLeague(UID : number, league : string)  {
  var tmp : RankedPlayer = RANKEDPLAYERS[5];
  var players_string = this.storage.getPlayersByLeague(league);
  if (players_string === null) {
    console.log("ERROR! No players found in this league.");
    return RANKEDPLAYERS[5]; //error player
  }
  else {
    var players : RankedPlayer[]= JSON.parse(players_string);
    for (let player of players) {
      if (player.UID === UID) {
          tmp  = player;      
      }
    }
    console.log("ERROR! No players found for this user in this league.");
    console.log(players);
    return tmp;

  }
  
}

  newPlayer(league : string, user : number) {
    var players_string = this.storage.getPlayersByLeague(league);
    if (players_string === null) {
      var player : RankedPlayer = {
        id : 'p0',
        UID : user,
        fullname : this.storage.getSelectedUser().fullname,
        points : 0,
        picture_url : this.storage.getSelectedUser().profile_pic, 
        matches: [],
        events: [], 
        active: true};
      return player;  
    }
    else {
      var players : RankedPlayer[]= JSON.parse(players_string);
      var player : RankedPlayer = {
        id : 'p' + players.length.toString(),
        UID : user,
        fullname : this.storage.getSelectedUser().fullname,
        points : 0,
        picture_url : this.storage.getSelectedUser().profile_pic, 
        matches: [],
        events: [],
        active: true};
      players.push(player);

      return player;    
    }
  }

  getPlayerById(league : string, id : string) {
    var players_string = this.storage.getPlayersByLeague(league);
    if (players_string === null) {
      console.log("No player present, impossibile");
      return RANKEDPLAYERS[5]; //error player
    }
    else {
      var players : RankedPlayer[] = JSON.parse(players_string);
      var index = players.findIndex(function(x, index) {
        if(x.id == id)
          return true;
      });
      if (index === -1) {
        console.log("Player not found");
        console.log(players);
        return RANKEDPLAYERS[5]; //error player
      }
      else {
        return players[index];
      }
    }
  }
}