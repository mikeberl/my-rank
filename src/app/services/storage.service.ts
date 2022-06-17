import { Injectable } from '@angular/core';
import { League } from '../models/league.model';
import { Match } from '../models/match.model';
import { RankedPlayer } from '../models/ranked-player.model';
import { ReportMessage } from '../models/report-message.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { GeneratorService } from './generator.service';
import { SpecialEvent } from '../models/special-event.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  report_ : string = "REPORT_";
  matches_ : string = "MATCHES_";
  players_ : string = "PLAYERS_";
  leagues_ : string = "LEAGUES_";
  users_ : string = "USERS_";
  events_ : string = "EVENTS_";

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

    leagueService.generate();
   }

  getEventByLeague(league : string) {

  } 



  getUsers() : User[] {
    var users_string = localStorage.getItem(this.users_);
    if (users_string === null) {
      //localStorage.setItem(this.users_, JSON.stringify(this.userService.getUsers()));
      this.leagueService.generate();
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
      //localStorage.setItem(this.users_, JSON.stringify(this.userService.getUsers()));
      this.leagueService.generate();
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
      this.leagueService.generate();
      //localStorage.setItem(this.leagues_, JSON.stringify(this.leagueService.getLeagueitem()));
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
      this.leagueService.generate();
      //localStorage.setItem(this.leagues_, JSON.stringify(this.leagueService.getLeagueitem()));
      return this.leagueService.getLeagueitem()[0];

    }
    
  }

  getLeaguesByUser(user : User) : League[] {
    var leagues_string = localStorage.getItem(this.leagues_);
    if (leagues_string === null) {
      this.leagueService.generate();
      //localStorage.setItem(this.leagues_, JSON.stringify(this.leagueService.getLeagueitem()));
      return this.leagueService.getLeagueitem();
    }
    else {
      var leagues : League[] = JSON.parse(leagues_string);
      var joined_leagues : League[] = [];
      for (let league of user.leagues) {
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
    var tmp_matches = localStorage.getItem(this.matches_ + league);
    return tmp_matches;
  }

  getEventsByLeague(league : string) : string | null {
    var tmp_events = localStorage.getItem(this.events_ + league);
    return tmp_events;
  }

  getPlayersByLeague(league : string) : string | null {
    var tmp_players = localStorage.getItem(this.players_ + league);
    return tmp_players;
  }

  getActivePlayersByLeague(league : string) {
    var players_string = localStorage.getItem(this.players_ + league);
    var active_players : RankedPlayer[] = [];

    if (players_string === null) {
      console.log("you should never come here");
      return active_players;
    }
    else {
      var players = JSON.parse(players_string);
      
      for (let player of players) {
        if (player.active === true) {
          active_players.push(player);
        }
      }
      return active_players;
    }
  }

  getSpecificPlayerOfUser(league : string, user : User) {
    var players_string = localStorage.getItem(this.players_ + league);
    if (players_string === null) {
      this.leagueService.generate();
    }
    else 
    {
      var players : RankedPlayer[] = JSON.parse(players_string);
      var index = players.findIndex(function(x, index) {
        if(x.UID == user.Uid)
          return true;
      });
      if (index === -1) {
        console.log("NO sense error! Selected user is not part of users list.");
        return;
      }
      else {
        //return players[index];
        return index;
      }

    }
    
  }

  saveReport(league : string, reports : ReportMessage[]) {
    localStorage.setItem(this.report_ + league, JSON.stringify(reports));
  }

  saveMatch(league : string, matches : Match[]) {
    localStorage.setItem(this.matches_ + league, JSON.stringify(matches));
  }

  savePlayer(league : string, players : RankedPlayer[]) {
    localStorage.setItem(this.players_ + league, JSON.stringify(players));
  }

  saveLeague(leagues : League[]) {
    localStorage.setItem(this.leagues_, JSON.stringify(leagues));
  }

  saveUser(users : User[]) {
    localStorage.setItem(this.users_, JSON.stringify(users));
  }

  saveEvent(event : SpecialEvent) {
    var events_string = localStorage.getItem(this.events_ + event.league_id);
    if (events_string != null) {
      var events : SpecialEvent[] = JSON.parse(events_string);
      events.push(event);
      localStorage.setItem(this.events_, JSON.stringify(events));
    }
    else {
      var events : SpecialEvent[] = [];
      events.push(event);
      localStorage.setItem(this.events_, JSON.stringify(events));
    }
  }
}
