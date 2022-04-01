import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { RankedPlayer, RankedPlayers } from 'src/app/models/ranked-player.model';
import { MatchDay, MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';
import { DialogOverviewExampleDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

    dates = ['16 March', '12 March', '10 March'];

    playerList : RankedPlayer[] = [];

    league_id :string = "";

    matches_available = true;

    match_days : MatchDay[] = [];

  constructor(public dialog: MatDialog,
              public playerService: PlayerService,
              private route: ActivatedRoute,
              private matchService: MatchService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']) //log the value of id
      this.league_id = params['id'];
      this.playerList = this.playerService.getRankedPlayersByLeague(this.league_id);
      var days_tmp = this.matchService.getMatchesByDays(this.league_id);
      if (days_tmp != null) {
        this.match_days = days_tmp;
      }
      else {
        this.matches_available = false;
      }
    });
  }

  openDialog(match : Match): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { reporter_id : 0, match : match } // TODO get player_id/user_id of reporter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  loadMore() {
  }

  getPlayersName(players : RankedPlayer[]) {
    var players_string : string[] = [];
    for (let player of players) {
      players_string.push(player.fullname);
    }
    return players_string;
  }



}
