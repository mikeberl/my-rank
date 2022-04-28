import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/models/league.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss']
})
export class AdminSectionComponent implements OnInit {

  user : User;


  not_admin = false;
  managed_leagues : League[] = [];

  constructor(private storage : StorageService) { 
    this.user = this.storage.getSelectedUser();

    

  }

  ngOnInit(): void {

    var leagues = this.storage.getLeagues();
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
