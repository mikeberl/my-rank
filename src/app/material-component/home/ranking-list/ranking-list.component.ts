import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/models/league.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {

  leagueData : League[];

  constructor(public storage : StorageService) {
    var user = storage.getSelectedUser();
    this.leagueData = storage.getLeaguesByUser(user);
   }

  ngOnInit(): void {
  }

}
