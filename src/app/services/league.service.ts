import { Injectable } from '@angular/core';
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

    /* if (this.checkIfPlayerIsInactive(users)) {

    } */
    var player = this.playerService.newPlayer(league, user);

    var users = this.storage.getUsers();
    var index = users.findIndex(function(x, index) {
      if(x.UID == user)
        return true;
    });
    if (index === -1) {
      console.log("NO sense error! Selected user is not part of users list.");
      return;
    }
    else {
      users[index].joined_leagues.push(league);
      this.storage.saveUser(users);
    }  
  }

  // Please note that leaving the league mean to not visualize it, 
  // the user's player connected to the league will remain 
  // 
  leaveLeague(league : string, user : number) {
    // var player = this.playerService.newPlayer(league, user);
    var selected_user = this.storage.getSelectedUser();
    var users = this.storage.getUsers();
    var index = users.findIndex(function(x, index) {
      if(x.UID == user)
        return true;
    });
    if (index === -1) {
      console.log("NO sense error! Selected user is not part of users list.");
      console.log(users);
      console.log(selected_user);
      return;
    }
    else {
      var l_index = users[index].joined_leagues.indexOf(league);
      if (l_index === -1) {
        console.log("Bad error! user is not in the league he is trying to leave!");
        return;
      }
      else {
        users[index].joined_leagues.splice(l_index, 1);
        this.storage.saveUser(users);
      }
      
    }  
  }
}
