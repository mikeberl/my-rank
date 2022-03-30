import { Injectable } from '@angular/core';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import { LeagueItems } from '../models/league.model';
import { Match, MatchNoId } from '../models/match.model';


export interface MatchDay {
  date: string,
  matches: Match[]
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // matches : Match[] = [];

  constructor(private leagueService : LeagueItems) {
    var leagues = leagueService.getLeagueitem();
    /* for (let league of leagues) {
      localStorage.setItem('all_matches',JSON.stringify(this.leagues_matches));
    } */
    
   }

  newMatch(league : string, match_no_id : MatchNoId) {
    var tmp_matches = localStorage.getItem('MATCH_'+ league);
    if (tmp_matches != null) {
      var matches : Match[] = JSON.parse(tmp_matches);
      console.log(matches);
      var match = this.getMatchId(match_no_id, matches);
      matches.push(match);
      localStorage.setItem('MATCH_'+ league, JSON.stringify(matches));     
    } 
    else {
      var matches : Match[] = [];
      var match = this.getMatchId(match_no_id, matches);
      matches.push(match);
      //this.leagues_matches.set(league, matches);
      localStorage.setItem('MATCH_'+ league, JSON.stringify(matches));
    }
  }

  getMatchId(no_id : MatchNoId, matches : Match[]) {
    var next_id = matches.length;
    var match : Match = {id : next_id, player_id: no_id.player_id, league_id: no_id.league_id, winners: no_id.winners,
              losers : no_id.losers, points : no_id.points, was_reported: no_id.was_reported, date: no_id.date};
    return match;
  }

  getMatchesByLeague(league: string) {
    var tmp_matches = localStorage.getItem('MATCH_'+ league);
    if (tmp_matches != null) {
      var matches : Match[] = JSON.parse(tmp_matches);
      return matches;
    }
    return undefined;
  }

  reportMatch(league: string, match : Match) {
    var tmp_matches = localStorage.getItem('MATCH_'+ league);
    if (tmp_matches != null) {
      var matches : Match[] = JSON.parse(tmp_matches);
      for (let match_ of matches) {
        if (JSON.stringify(match_) === JSON.stringify(match)) {
          match_.was_reported = true;
        }
      }
      localStorage.setItem('MATCH_'+ league, JSON.stringify(matches));
    }
    else {
      console.log("no league found");
    }
  }

  getMatchesByDays(league: string) {
    var match_days : MatchDay[] = [];
    var tmp_matches = localStorage.getItem('MATCH_'+ league);

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
