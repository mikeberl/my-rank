import { Component, OnInit } from '@angular/core';
import { LeagueItems } from 'src/app/models/league.model';

@Component({
  selector: 'app-all-leagues',
  templateUrl: './all-leagues.component.html',
  styleUrls: ['./all-leagues.component.scss']
})
export class AllLeaguesComponent implements OnInit {

  constructor(public leagueItems : LeagueItems) { }

  ngOnInit(): void {
  }

}
