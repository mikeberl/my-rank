import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/models/league.model';
import { User } from 'src/app/models/user.model';
import { PlayerService } from 'src/app/services/player.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {

  leagueData : League[];
  user : User;

  constructor(public storage : StorageService,
              public playerService : PlayerService) {
    this.user = storage.getSelectedUser();
    this.leagueData = storage.getLeaguesByUser(this.user);
   }

  ngOnInit(): void {
  }

  getRankPlayerString(league : string) : string {
    var players = this.playerService.getRankedPlayersByLeague(league);
    var number_of_players = players.length;
    //just for findIndex
    var user = this.user;
    var rank = players.findIndex(function(x, index) {
      if(x.UID == user.UID)
        return true;
    });
    rank = rank + 1; //index start from 0
    var end_string : string = rank.toString() + " / " + number_of_players.toString();
    return end_string;


  }

}
