import { Component, OnInit } from '@angular/core';
import { League, LeagueItems } from 'src/app/models/league.model';
import { User, Users } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss']
})
export class AdminSectionComponent implements OnInit {

  user : User;


  not_admin = false;
  managed_leagues : League[] = [];

  constructor(private userService : Users,
              private leagueService : LeagueItems) { 
    this.user = this.userService.getMain();

    

  }

  ngOnInit(): void {

    var leagues = this.leagueService.getLeagueitem();
    var check = true;
    for (let league of leagues) {
      if (league.admin_id === this.user.UID)  {
        check = false;
        this.managed_leagues.push(league);
      }
    }
    this.not_admin = check;
  }
}
