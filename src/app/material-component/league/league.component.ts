import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RankedPlayer, RankedPlayers } from 'src/app/models/ranked-player.model';
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

  constructor(public dialog: MatDialog,
              public playerService: RankedPlayers,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']) //log the value of id
      this.league_id = params['id'];
      this.playerList = this.playerService.getRankedPlayersByLeague(this.league_id);
    });
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { id : this.league_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  loadMore() {
  }



}
