import { Injectable } from '@angular/core';
import { League } from '../models/league.model';
import { RankedPlayer } from '../models/ranked-player.model';
import { ReportMessage } from '../models/report-message.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { GeneratorService } from './generator.service';
import { Event } from '../models/special-event.model';
import { PointsEntry } from '../models/points-entry.model';
import { map } from 'rxjs-compat/operator/map';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  report_ : string = "REPORT_";
  // matches_ : string = "MATCHES_";
  players_ : string = "PLAYERS_";
  leagues_ : string = "LEAGUES_";
  users_ : string = "USERS_";
  events_ : string = "EVENTS_";
  points_ : string = "POINTS_";

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
   // TODO
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
        if(x.UID == user.UID)
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

  saveLeague(leagues : League[]) {
    localStorage.setItem(this.leagues_, JSON.stringify(leagues));
  }

  saveUser(users : User[]) {
    localStorage.setItem(this.users_, JSON.stringify(users));
  }

  saveEvent(event : Event) {
    var events_string = localStorage.getItem(this.events_ + event.league_id);
    if (events_string != null) {
      var events : Event[] = JSON.parse(events_string);
      events.push(event);
      localStorage.setItem(this.events_, JSON.stringify(events));
    }
    else {
      var events : Event[] = [];
      events.push(event);
      localStorage.setItem(this.events_, JSON.stringify(events));
    }
  }

  /////////////////////////////////////////////////////////////////////////
  // POINTSENTRY functions
  ////////////////////////////////////////////////////////////////////////

  newPointsEntry(points : PointsEntry) : PointsEntry { //id will be = 0; and new a pointsentry with new id will be returned
    if (points.id != 0) {
      console.log("newPointsEntry with id != 0");
      throw console.error("newPointsEntry: given entry has id != 0");     
    }
    var tmp_string = localStorage.getItem(this.points_);
    if (tmp_string != null) {
      var map_points : Map<number, PointsEntry> = JSON.parse(tmp_string);
      var i : number;
      for(i = 1; i > 0; i++) {
        if (!map_points.has(i)) {
          points.id = i;
          map_points.set(i, points);
          break;
        }
      } 
      localStorage.setItem(this.points_, JSON.stringify(map_points));
      return points;
    }
    else {
      var map_points : Map<number, PointsEntry> = new Map<number, PointsEntry>();
      points.id = 1;
      map_points.set(1, points);
      localStorage.setItem(this.points_, JSON.stringify(map_points));
      return points;
    }
  }

  changePointsEntry(points : PointsEntry) {
    var tmp_string = localStorage.getItem(this.points_);
    if (tmp_string != null) {
      var map_points : Map<number, PointsEntry> = JSON.parse(tmp_string);
      if (map_points.has(points.id)) {
        map_points.delete(points.id);
        map_points.set(points.id, points);
        localStorage.setItem(this.points_, JSON.stringify(map_points));
      }
      else {
        console.log("changePointsEntry: points not present in the map");
      }

    }
    else {
      console.log("changePointsEntry: pointsentry is empty");
    }
  }

  deletePointsEntry(points : PointsEntry) {
    var tmp_string = localStorage.getItem(this.points_);
    if (tmp_string != null) {
      var map_points : Map<number, PointsEntry> = JSON.parse(tmp_string);
      if (map_points.has(points.id)) {

        map_points.delete(points.id);
        localStorage.setItem(this.points_, JSON.stringify(map_points));
      }
      else {
        console.log("deletePointsEntry: points not present in the map");
      }

    }
    else {
      console.log("deletePointsEntry: pointsentry is empty");
    }
  }

  /* private deletePointsofMatch(match : Match2, points : Map<number, PointsEntry>) {
    var tmp_test = 0;
      for (let m of match.points) {
        var del = points.delete(m.id);
        if (del) {
          tmp_test = tmp_test + 1;
        }         
      }
      console.log(tmp_test + " test deleted");
      localStorage.setItem(this.points_, JSON.stringify(points));
  } */

  getPointsByList(points : PointsEntry[]) {
    var tmp_string = localStorage.getItem(this.points_);
    var return_list : PointsEntry[] = [];
    if (tmp_string != null) {
      var map_points : Map<number, PointsEntry> = JSON.parse(tmp_string);
      for (let p of points) {
        var tmp = map_points.get(p.id);
        if (tmp != undefined) {          
          return_list.push(tmp);
        }
        else {
          console.log("deletePointsEntry: points not present in the map");
        }
      }

    }
    else {
      console.log("deletePointsEntry: pointsentry is empty");
    }
  }

  /////////////////////////////////////////////////////////////////////////
  // MATCH functions
  ////////////////////////////////////////////////////////////////////////

  // not calling  this.getMatchesByLeague(match.league_id); for avoiding a
  // crash on the first match registration
  newEvent(match : Event) {
    var matches : Event[] = [];
    var tmp_string = localStorage.getItem(this.events_ + match.league_id);
    if (tmp_string != null) {
      matches = JSON.parse(tmp_string);
      for(var i = 1; i > 0; i++) {
        var index = matches.findIndex(function(x, index) {
          if(x.id === i)
            return true;
        });
        if (index === -1) {
          match.id = i; 
          break;
        }
      } 
      
    }
    else {
      match.id = 1;
    }
    for (let entry of match.points) {
      entry.match = match;
    }
    matches.push(match);
    localStorage.setItem(this.events_ + match.league_id, JSON.stringify(matches));   
    return match;
  }

  modifyEvent(match : Event) {
    var matches : Event[] = this.getEventsByLeague(match.league_id);
    var index = matches.findIndex(function(x, index) {
      if(x.id === match.id)
        return true;
    });
    matches[index] = match;
    localStorage.setItem(this.events_ + match.league_id, JSON.stringify(matches));  
  }

  deleteEvent(match : Event) {
    var matches : Event[] = this.getEventsByLeague(match.league_id);
    var tmp_points = localStorage.getItem(this.points_);
    if (tmp_points != null) {
      var points : Map<number, PointsEntry> = JSON.parse(tmp_points);
      // this.deletePointsofMatch(match, points);
      var index = matches.findIndex(function(x, index) {
        if(x.id === match.id)
          return true;
      });
      matches.splice(index, 1);
      localStorage.setItem(this.events_ + match.league_id, JSON.stringify(matches)); 
    }
    else {
      console.log("ERROR: no league found");
    }
  }

  getEventsByLeague(league : string) {
    var tmp_matches = localStorage.getItem(this.events_ + league);
    if (tmp_matches != null) {
      var matches : Event[] = JSON.parse(tmp_matches);
      return matches;
    }
    else {
      throw console.error("getMatchesByLeague2: league not found");
    }
  }

  newPlayer(league : string, player : RankedPlayer) {
    var tmp_players = localStorage.getItem(this.players_ + league);
    var players : RankedPlayer[] = [];
    if (tmp_players === null) {
      player.id = 'p_1';
      players.push(player);
    }
    else {
      players = JSON.parse(this.players_ + league);
      for (var i = 1; i > 0; i++) {
        var index = players.findIndex(function(x, index) {
          if( x.id === ('p_' + i.toString()))
            return true;
        });
        if (index === -1) {
          player.id = 'p_' + i.toString();
          break;
        }

      }
    }
    localStorage.setItem(this.players_ + league, JSON.stringify(players));
    return player;
  }

}
