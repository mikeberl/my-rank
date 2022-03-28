import { Component, OnInit } from '@angular/core';
import { League, LeagueItems } from 'src/app/models/league.model';
import { User, Users } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent implements OnInit{

  user : User;

  arr_league : League[] = [];

  constructor(private userService : Users,
              private leagueService : LeagueItems) {
    //TODO get the user for this check 
    this.user = userService.getUsers()[0];
    for (let league of this.user.joined_leagues) {
      this.arr_league.push(leagueService.getLeagueById(league));
    }
  }

  ngOnInit(): void {
  }

}
