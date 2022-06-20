import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/models/league.model';
import { User } from 'src/app/models/user.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent implements OnInit{

  owner : User | undefined;

  leagues : League[] = [];

  constructor(private userService : UserService, 
              private httpService : HttpServiceService) {
    //TODO get the user for this check 
    this.owner = userService.getOwner();
    if (this.owner != undefined) {
      httpService.getLeaguesByUser(this.owner.Uid).subscribe((leagues : League[]) => {
        this.leagues = leagues;
      });
    }
    
    this.userService.ownerEmitter.subscribe((owner) => {
      this.owner = owner;
      if (owner != undefined) {
        this.owner = owner;
        httpService.getLeaguesByUser(this.owner.Uid).subscribe((leagues : League[]) => {
          this.leagues = leagues;
        });
      }
    })
  }

  ngOnInit(): void {
  }

}
