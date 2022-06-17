import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { League } from 'src/app/models/league.model';
import { User } from 'src/app/models/user.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { PlayerService } from 'src/app/services/player.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {

  owner_leagues : League[] = [];
  /* user : User; */
  owner : User | undefined;

  constructor(private httpService : HttpServiceService,
              private userService : UserService) {
    this.owner = this.userService.getOwner();
    if (this.owner != undefined) {
      httpService.getLeaguesByUser(this.owner?.Uid).pipe(
        map( (leagues : League[]) => {
          this.owner_leagues = leagues;
          return leagues;
        })
      ).subscribe();
    }
    
   }

  ngOnInit(): void {
  }

  /* getRankPlayerString(league : string) : string {
    var players = this.playerService.getRankedPlayersByLeague(league);
    var number_of_players = players.length;
    //just for findIndex
    var user = this.owner;
    var rank = players.findIndex(function(x, index) {
      if(x.UID === user?.Uid)
        return true;
    });
    rank = rank + 1; //index start from 0
    var end_string : string = rank.toString() + " / " + number_of_players.toString();
    return end_string;


  } */

}
