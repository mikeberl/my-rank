import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeagueItems } from 'src/app/models/league.model';
import { Users } from 'src/app/models/user.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-all-leagues',
  templateUrl: './all-leagues.component.html',
  styleUrls: ['./all-leagues.component.scss']
})
export class AllLeaguesComponent implements OnInit {

  constructor(public storage : StorageService,
              public snackBar: MatSnackBar,
              public userService : Users) {}

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
    this.snackBar.open("YOU STILL NEED TO IMPLEMENT THIS!", "OK", {
      duration: 2000,
    });
  }

  

}
