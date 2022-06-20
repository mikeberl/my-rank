import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { LeagueService } from 'src/app/services/league.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { League } from 'src/app/models/league.model';

@Component({
  selector: 'app-all-leagues',
  templateUrl: './all-leagues.component.html',
  styleUrls: ['./all-leagues.component.scss']
})
export class AllLeaguesComponent implements OnInit {

  owner : User | undefined;
  leagues : League[] = []

  constructor(public snackBar: MatSnackBar,
              public userService : UserService,
              public leagueService : LeagueService,
              private router: Router,
              private httpService : HttpServiceService) {
    
      this.owner = userService.getOwner();
      if (this.owner === undefined) {
        this.userService.logout();
      }
      else {
        httpService.getJoinableLeagues(this.owner?.Uid).subscribe((leagues : League[]) => {
          this.leagues = leagues
        });
      }
      this.userService.ownerEmitter.subscribe((owner : User | undefined) => {
        this.owner = owner;
      })
    }

  ngOnInit(): void {
  }

  openSnackBar() {
    this.snackBar.open("Request sent!", "OK", {
      duration: 2000,
    });
  }

  /* isJoinable(league : string) {
    if (this.leagues.indexOf(league) === -1) {
      return true;
    }
    else {
      return false;
    }
  } */

  /* leaveLeague(league : string) {
    this.leagueService.leaveLeague(league, this.owner.Uid);
    this.snackBar.open("You leaved the league!", "OK", {
      duration: 2000,
    });
  } */

  joinLeague(league : number) {
    console.log(league);
    if (this.owner != undefined) {
      this.httpService.joinLeague(this.owner.Uid, league).subscribe();
      this.snackBar.open("You joined the league!", "OK", {
        duration: 2000,
      });
      this.router.navigate(['/league/' + league]);
    }
    

  }

  

}
