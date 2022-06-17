import { Injectable } from '@angular/core';
import { RankedPlayer } from '../models/ranked-player.model';
import { User } from '../models/user.model';
import { PlayerService } from './player.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private playerService : PlayerService,
              private storage : StorageService) 
  { }


  /* checkIfPlayerIsInactive(users : User[]) : boolean {

  } */

  joinLeague(league : string, user : number) {

    var users = this.storage.getUsers();

    var users = this.storage.getUsers();
    var index = users.findIndex(function(x, index) {
      if(x.Uid == user)
        return true;
    });
    if (index === -1) {
      console.log("NO sense error! Selected user is not part of users list.");
      return;
    }
    else {
      var players : RankedPlayer[] = [];
      var players_string = this.storage.getPlayersByLeague(league);
      if (players_string != null) {
        players = JSON.parse(players_string);
      }
      users[index].leagues.push(league);
      this.storage.saveUser(users);

      var existing_player_index = this.storage.getSpecificPlayerOfUser(league, users[index]);

      if (existing_player_index == undefined)  { // non esiste
        var player = this.playerService.newPlayer(league, user);
        players.push(player);
      }
      else if (players[existing_player_index].active === false) {
        players[existing_player_index].active = true;
      }
      else {
        console.log("Impossible to register a new player, an active player already exists or something went wrong");
        return;
      }
      this.storage.savePlayer(league, players);
    }  
  }

  // Please note that leaving the league mean to not visualize it, 
  // the user's player connected to the league will remain but set as inactive
  // 
  leaveLeague(league : string, user : number) {
    // var player = this.playerService.newPlayer(league, user);
    var selected_user = this.storage.getSelectedUser();
    var users = this.storage.getUsers();
    var index = users.findIndex(function(x, index) {
      if(x.Uid == user)
        return true;
    });
    if (index === -1) {
      console.log("NO sense error! Selected user is not part of users list.");
      console.log(users);
      console.log(selected_user);
      return;
    }
    else {
      var l_index = users[index].leagues.indexOf(league);
      if (l_index === -1) {
        console.log("Bad error! user is not in the league he is trying to leave!");
        return;
      }
      else {
        users[index].leagues.splice(l_index, 1);
        this.storage.saveUser(users);

        var players : RankedPlayer[] = [];
        var players_string = this.storage.getPlayersByLeague(league);
        if (players_string != null) {
          players = JSON.parse(players_string);
        }
        else {
          console.log("No sense error! the league you are trying to leave has no players");
        }

        var existing_player_index = this.storage.getSpecificPlayerOfUser(league, users[index]);

      if (existing_player_index == undefined)  { // non esiste
        console.log("No sense error! You have no player in this league");
      }
      else if (players[existing_player_index].active === false) {
        console.log("No sense error! The player is already inactive");
      }
      else {
        console.log("player has been setted as inactive");
        players[existing_player_index].active = false;
        this.storage.savePlayer(league, players);
      }
      
    }
      
    }  
  }
}
