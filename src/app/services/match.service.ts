import { Injectable } from '@angular/core';
import { LeagueItems } from '../models/league.model';
import { Match, MatchNoId } from '../models/match.model';
import { PlayerService } from './player.service';
import { StorageService } from './storage.service';


export interface MatchDay {
  date: string,
  matches: Match[]
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // matches : Match[] = [];

  constructor(private leagueService : LeagueItems,
              private playerService : PlayerService,
              private storage : StorageService) {
    var leagues = leagueService.getLeagueitem();
    
   }

  newMatch(league : string, match_no_id : MatchNoId) {
    var tmp_matches = this.storage.getMatchesByLeague(league);
    if (tmp_matches != null) {
      var matches : Match[] = JSON.parse(tmp_matches);
      console.log(matches);
      var match = this.getMatchId(match_no_id, matches);
      matches.push(match);
      this.storage.saveMatch(league, matches);  
      this.playerService.addMatch(match);
   
    } 
    else {
      var matches : Match[] = [];
      var match = this.getMatchId(match_no_id, matches);
      matches.push(match);
      //this.leagues_matches.set(league, matches);
      this.storage.saveMatch(league, matches); 
      this.playerService.addMatch(match);
    }

  }

  getMatchId(no_id : MatchNoId, matches : Match[]) {
    var next_id = matches.length;
    var match : Match = {id : next_id, player_id: no_id.player_id, league_id: no_id.league_id, winners: no_id.winners,
              losers : no_id.losers, points : no_id.points, was_reported: no_id.was_reported, date: no_id.date};
    return match;
  }

  getMatchesByLeague(league: string) {
    var tmp_matches = this.storage.getMatchesByLeague(league);
    if (tmp_matches != null) {
      var matches : Match[] = JSON.parse(tmp_matches);
      return matches;
    }
    return undefined;
  }

  reportMatch(league: string, match : Match) {
    var tmp_matches = this.storage.getMatchesByLeague(league);
    if (tmp_matches != null) {
      var matches : Match[] = JSON.parse(tmp_matches);
      for (let match_ of matches) {
        if (JSON.stringify(match_) === JSON.stringify(match)) {
          match_.was_reported = true;
        }
      }
      this.storage.saveMatch(league, matches); 
    }
    else {
      console.log("ERROR: no league found");
    }
  }

  getMatch(league: string, match: number) : Match | undefined {
    console.log("searched match is: "+ match);
    var tmp_matches = this.storage.getMatchesByLeague(league);
    if (tmp_matches != null) {
      var matches : Match[] = JSON.parse(tmp_matches);
      for (let match_ of matches) {
        console.log("match_ id is: "+ match_.id);
        if(match_.id.toString() === match.toString()) {
          console.log("match is returned");
          return match_;
        }
      }

    }
    else {
      console.log("ERROR: no league found");
      return undefined;
    }
  }

  modifyMatchPoints(match : Match) {
    var tmp_matches = this.storage.getMatchesByLeague(match.league_id);
    if (tmp_matches != null) {
      var matches : Match[] = JSON.parse(tmp_matches);
      for (let match_ of matches) {
        if(match_.id === match.id) {
          matches[matches.indexOf(match_)].points = match.points;
          matches[matches.indexOf(match_)].was_reported = false;
          this.storage.saveMatch(match.league_id, matches); 
        }
      }
    }
    else {
      console.log("ERROR: no league found");
    }
  }

  getMatchesByDays(league: string) {
    var match_days : MatchDay[] = [];
    var tmp_matches = this.storage.getMatchesByLeague(league);

    if (tmp_matches != null) {
      var matches : Match[] = JSON.parse(tmp_matches);
      for (let match of matches) {
        if (match.date === null) {
          console.log("TODO : date required & error handling");
          continue;
        }
        else {
          var exists = false;
          for (let day of match_days) {
            if (day.date === match.date) {
              day.matches.push(match);
              exists = true;
            }
          }
          if (exists === false) {
            var new_day : MatchDay = {date : match.date, matches: []};
            new_day.matches.push(match);
            match_days.push(new_day);
          }
        }
      }
      return match_days; 
    }
    else {
      return null;
    }
  }

  // just for testing
  clearMatches() {
    localStorage.clear();
  } 
}
