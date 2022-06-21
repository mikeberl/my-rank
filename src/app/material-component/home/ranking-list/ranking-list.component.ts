import { Component, Input, OnInit } from '@angular/core';
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

  @Input()
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

  leaveLeague(Lid : number)  {
    if (Lid != undefined && this.owner?.Uid != undefined) {
      console.log("User " + this.owner?.Uid +" leaving league " + Lid);
      this.httpService.leaveLeague(this.owner?.Uid, Lid).subscribe((l) => {
        console.log(l);
        var i = this.owner_leagues.findIndex((league) => {
          if (league.Lid == Lid) {           
            return;
          }
        })
        this.owner_leagues.splice(i, 1);
        return;
      })
    }
    
  }

}
