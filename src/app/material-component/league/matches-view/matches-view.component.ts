import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { RankedPlayer } from 'src/app/models/ranked-player.model';
import { User } from 'src/app/models/user.model';
import { MatchDay, MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';
import { UserService } from 'src/app/services/user.service';
import { DialogOverviewExampleDialogComponent } from '../../dialog/dialog.component';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-matches-view',
  templateUrl: './matches-view.component.html',
  styleUrls: ['./matches-view.component.css']
})
export class MatchesViewComponent implements OnInit {

  matches_available = true;

  match_days : MatchDay[] = [];

  league_id :string = "";

  pipe = new DatePipe('en-US');
  

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private matchService: MatchService,
              private playerService : PlayerService,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.league_id = params['id'];
      var days_tmp = this.matchService.getMatchesByDays(this.league_id);
      console.log(days_tmp);
      if (days_tmp != null) {
        this.match_days = days_tmp;
      }
      else {
        this.matches_available = false;
      }
    });
  }

  getFormatedDate(date : Date) {
    var dateWithPipe = null;
    dateWithPipe = this.pipe.transform(date, 'EEEE, MMMM d, y')?.toString();
    return dateWithPipe;

  }

  openDialog(match : Match): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '300px',
      height: '400px',
      data: { reporter_id : 0, match : match } // TODO get player_id/user_id of reporter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  loadMore() {
    this.openSnackBarNoMoreMatches("ERROR:", "No more mathes to be loaded.");
  }

  getPlayersName(players : RankedPlayer[]) {
    var players_string : string[] = [];
    for (let player of players) {
      players_string.push(player.fullname);
    }
    return players_string;
  }

  getPlayer(id : string) {
    var player = this.playerService.getPlayerById(this.league_id, id);
    return player;
  }

  openSnackBarNoMoreMatches(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
