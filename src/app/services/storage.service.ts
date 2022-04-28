import { Injectable } from '@angular/core';
import { League } from '../models/league.model';
import { Match } from '../models/match.model';
import { RankedPlayer } from '../models/ranked-player.model';
import { ReportMessage } from '../models/report-message.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { PlayerService } from './player.service';
import { GeneratorService } from './generator.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  report_ : string = "REPORT_";
  matches_ : string = "MATCHES_";
  players_ : string = "PLAYERS_";
  leagues_ : string = "LEAGUES_";
  users_ : string = "USERS_";

  constructor(private userService : UserService,
              private leagueService : GeneratorService
              //private playerService : PlayerService
              ) {
    var leagues = localStorage.getItem(this.leagues_);
    if (leagues === null) {
      localStorage.setItem(this.leagues_, JSON.stringify(leagueService.getLeagueitem()));
    }

    var users = localStorage.getItem(this.users_);
    if (users === null) {
      localStorage.setItem(this.leagues_, JSON.stringify(leagueService.getLeagueitem()));
    }

   }

  getUsers() : User[] {
    var users_string = localStorage.getItem(this.users_);
    if (users_string === null) {
      localStorage.setItem(this.users_, JSON.stringify(this.userService.getUsers()));
      return this.userService.getUsers();
    }
    else {
      var users : User[] = JSON.parse(users_string);
      return users;
    }
  }


  getSelectedUser() : User {
    var users_string = localStorage.getItem(this.users_);
    if (users_string === null) {
      localStorage.setItem(this.users_, JSON.stringify(this.userService.getUsers()));
      return this.userService.getUsers()[0];
    }
    else {
      var users : User[] = JSON.parse(users_string);
      return users[0];
    }
  }

  getLeagues() : League[] {
    var leagues_string = localStorage.getItem(this.leagues_);
    if (leagues_string === null) {
      localStorage.setItem(this.leagues_, JSON.stringify(this.leagueService.getLeagueitem()));
      return this.leagueService.getLeagueitem();
    }
    else {
      var leagues : League[] = JSON.parse(leagues_string);
      return leagues;
    } 
  }

  getSpecificLeague (id: string) : League {
    var leagues_string = localStorage.getItem(this.leagues_);
    if (leagues_string != null) {
      var leagues = JSON.parse(leagues_string);
      for (let league of leagues) {
        if (league.id === id) {
          return league;
        }
      }
      console.log("ERROR NO LEAGUE FOUND IN getLeagueById");
      return leagues[0];
    }
    else {
      localStorage.setItem(this.leagues_, JSON.stringify(this.leagueService.getLeagueitem()));
      return this.leagueService.getLeagueitem()[0];

    }
    
  }

  getLeaguesByUser(user : User) {
    var leagues_string = localStorage.getItem(this.leagues_);
    if (leagues_string === null) {
      localStorage.setItem(this.leagues_, JSON.stringify(this.leagueService.getLeagueitem()));
      return this.leagueService.getLeagueitem();
    }
    else {
      var leagues : League[] = JSON.parse(leagues_string);
      var joined_leagues : League[] = [];
      for (let league of user.joined_leagues) {
        var index = leagues.findIndex(function(x, index) {
          if(x.id == league)
            joined_leagues.push(x);
        });
      }
      return joined_leagues;
    }
  }

  getReportByLeague(league : string) : string | null {
    var tmp_report = localStorage.getItem(this.report_ + league);
    return tmp_report;
  }

  getMatchesByLeague(league : string) : string | null {
    var tmp_report = localStorage.getItem(this.matches_ + league);
    return tmp_report;
  }

  getPlayersByLeague(league : string) : string | null {
    var tmp_report = localStorage.getItem(this.players_ + league);
    return tmp_report;
  }

  saveReport(league : string, reports : ReportMessage[]) {
    localStorage.setItem(this.report_ + league, JSON.stringify(reports));
  }

  saveMatch(league : string, reports : Match[]) {
    localStorage.setItem(this.matches_ + league, JSON.stringify(reports));
  }

  savePlayer(league : string, reports : RankedPlayer[]) {
    localStorage.setItem(this.players_ + league, JSON.stringify(reports));
  }

  saveLeague(leagues : League[]) {
    localStorage.setItem(this.leagues_, JSON.stringify(leagues));
  }

  saveUser(users : User[]) {
    localStorage.setItem(this.users_, JSON.stringify(users));
  }
}
