import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { RankedPlayer, RankedPlayers } from '../models/ranked-player.model';
import { ReportMessage } from '../models/report-message.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  report_ : string = "REPORT_";
  matches_ : string = "MATCHES_";
  players_ : string = "PLAYERS_";

  constructor() { }

  getReportByLeague(league : string) {
    var tmp_report = localStorage.getItem(this.report_ + league);
    return tmp_report;
  }

  getMatchesByLeague(league : string) {
    var tmp_report = localStorage.getItem(this.matches_ + league);
    return tmp_report;
  }

  getPlayersByLeague(league : string) {
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
}
