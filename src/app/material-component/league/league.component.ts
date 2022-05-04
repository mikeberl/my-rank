import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { RankedPlayer } from 'src/app/models/ranked-player.model';
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

    

  constructor(public playerService: PlayerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.league_id = params['id'];
      this.playerList = this.playerService.getRankedPlayersByLeague(this.league_id);
    });
  }





}
