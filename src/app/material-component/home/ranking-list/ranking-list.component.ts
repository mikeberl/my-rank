import { Component, OnInit } from '@angular/core';
import { Contact, contacts } from 'src/app/dashboard/dashboard-components/contacts/contact-data';
import { League, LeagueItems } from 'src/app/models/league.model';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {

  leagueData : League[];

  constructor(public leagueItems : LeagueItems) {
    this.leagueData = leagueItems.getLeagueitem();
   }

  ngOnInit(): void {
  }

}
