import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeagueItems } from 'src/app/models/league.model';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { LeagueService } from 'src/app/services/league.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-all-leagues',
  templateUrl: './all-leagues.component.html',
  styleUrls: ['./all-leagues.component.scss']
})
export class AllLeaguesComponent implements OnInit {

  selected_user : User;

  constructor(public storage : StorageService,
              public snackBar: MatSnackBar,
              public userService : UserService,
              public leagueService : LeagueService) {
      
    this.selected_user = storage.getSelectedUser();
              }

  ngOnInit(): void {
  }

  openSnackBar() {
    this.snackBar.open("Request sent!", "OK", {
      duration: 2000,
    });
  }

  isJoinable(league : string) {
    var user = this.storage.getSelectedUser();
    if (user.joined_leagues.indexOf(league) === -1) {
      return true;
    }
    else {
      return false;
    }
  }

  leaveLeague(league : string) {
    this.leagueService.leaveLeague(league, this.selected_user.UID);
    this.snackBar.open("You leaved the league!", "OK", {
      duration: 2000,
    });
  }

  joinLeague(league : string) {
    this.leagueService.joinLeague(league, this.selected_user.UID);
    this.snackBar.open("You joined the league!", "OK", {
      duration: 2000,
    });
  }

  

}
