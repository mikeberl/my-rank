import { Injectable } from '@angular/core';
import { Event } from '../models/special-event.model';
import { PlayerService } from './player.service';
import { StorageService } from './storage.service';


export interface MatchDay {
  date: Date,
  matches: Event[]
}


@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
              private playerService : PlayerService,
              private storage : StorageService) {

    
   }

  /* newMatch(match : Event) {
    for(let entry of match.points) {
      this.storage.newPointsEntry(entry);
      // this.playerService.newPointsEntry(entry); TODO
    }
    this.storage.newMatch(match);
  } */

  newEvent(event : Event) {
    this.storage.newEvent(event); 
    for(let entry of event.points) {
      entry = this.storage.newPointsEntry(entry);
      // this.playerService.newPointsEntry(entry); TODO
    }
    this.storage.saveEvent(event);  
  }
  /* 
  newEvent(league : string, event : SpecialEvent) {
    this.storage.saveEvent(event);  
    this.playerService.addEvent(event);
  } */

  modifyMatch(match : Event) {
    this.storage.modifyMatch(match);
    for (let entry of match.points) {
      this.storage.changePointsEntry(entry);
      // this.playerService.newPointsEntry(entry); TODO
    }
  }

  deleteMatch(match : Event) {
    this.storage.deleteMatch(match);
    for (let entry of match.points) {
      this.storage.deletePointsEntry(entry);
      // this.playerService.newPointsEntry(entry); TODO
    }
  }

  getMatchesByDays(league: string) {
    var match_days : MatchDay[] = [];
    var matches = this.storage.getMatchesByLeague(league);
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

  getMatchesByLeague(league: string) {
    return this.storage.getMatchesByLeague(league);
  }

  reportMatch(match : Event) {
    match.was_reported = true;
    this.storage.modifyMatch(match);
  }

  getMatch(league: string, match: number) : Event | undefined {
    console.log("searched match is: "+ match);
    var matches = this.storage.getMatchesByLeague(league);
    for (let match_ of matches) {
      console.log("match_ id is: "+ match_.id);
      if(match_.id.toString() === match.toString()) {
        console.log("match is returned");
        return match_;
      }
    }   
    return undefined;  
  }

  // just for testing
  clearMatches() {
    localStorage.clear();
  } 
 
}
