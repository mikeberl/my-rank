import { Injectable } from '@angular/core';
import { RankedPlayer } from '../models/ranked-player.model';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { Event } from '../models/special-event.model';
import { PointsEntry } from '../models/points-entry.model';

const RANKEDPLAYERS = [
  { id: 'p1', UID: 1, fullname: 'Michele Berlanda', points: [], picture_url: '/assets/images/users/1.jpg', active: true},
  { id: 'p2', UID: 2, fullname: 'Piero Magi', points: [], picture_url: '/assets/images/users/2.jpg', active: true},
  { id: 'p3', UID: 3, fullname: 'Luca Arsev', points: [], picture_url: '/assets/images/users/3.jpg', active: true},
  { id: 'p4', UID: 4, fullname: 'Lucia Dandolomea', points: [], picture_url: '/assets/images/users/4.jpg', active: true},
  { id: 'p5', UID: 1, fullname: 'Asah Moah', points: [], picture_url: '/assets/images/users/5.jpg' , active: true},
  { id: 'p99', UID: 9, fullname: 'ERROR', points: [], picture_url: '/assets/images/users/6.jpg', active: false}   
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
  }

/*   addMatch(match : Match) {
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
  } */

  newPointsEntry(entry : PointsEntry) {
    var league = entry.match?.league_id;
    if (league === undefined) {
      console.log("newEntryPoints: entry has no league");
    }
    else {
      var players = this.storage.getActivePlayersByLeague(league);
      var index = players.findIndex(function(x, index) {
        if(x.id === entry.player.id) 
          return true;
      });
      if (index != -1 ) {
        players[index].points.push(entry);
        this.storage.modifyPlayer(player)
      }
    }
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
    var players : RankedPlayer[] = this.storage.getActivePlayersByLeague(league);
    /* players.sort((a,b) => {
      return b.points - a.points;
    }); */
    return players;
}

  getPlayerByUserAndLeague(UID : number, league : string)  {
    var players : RankedPlayer[] = this.storage.getActivePlayersByLeague(league);
    var tmp : RankedPlayer | undefined = undefined;
    for (let player of players) {
      if (player.UID === UID) {
          tmp  = player;     
          break; 
      }
    }
    return tmp;  

  }

  newPlayer(league : string, user : number) {
    var tmp_player : RankedPlayer = {
        id : '',
        UID : user,
        fullname : this.storage.getSelectedUser().fullname,
        points : [],
        picture_url : this.storage.getSelectedUser().profile_pic, 
        active: true
    };
    var player : RankedPlayer = this.storage.newPlayer(league, tmp_player);

    return player;  
  }

  getPlayerById(league : string, id : string) {
    var players = this.storage.getActivePlayersByLeague(league);
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