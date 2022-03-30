import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { ReportMessage, ReportMessageNoId } from '../models/report-message.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  // reports : ReportMessage[] = [];

  constructor() { }

  addReport(league: string, report_noid : ReportMessageNoId) {
    var tmp_matches = localStorage.getItem('REPORT_'+ league);
    var id = 0;

    if (tmp_matches != null) {
      var reports : ReportMessage[] = JSON.parse(tmp_matches);
      
      if (reports.length > 0) {
        id = reports[reports.length - 1].id + 1;
      }
      var report : ReportMessage = {
        id : id,
        game_id : report_noid.game_id,
        league_id : report_noid.league_id,
        date : report_noid.date,
        report_type : report_noid.report_type,
        message : report_noid.message,
        reporter_id : report_noid.reporter_id
      };
      reports.push(report);
      localStorage.setItem('REPORT_' + league, JSON.stringify(reports));
      console.log(reports);
      }
      else {
        var reports : ReportMessage[] = [];
        var report : ReportMessage = {
          id : 0,
          game_id : report_noid.game_id,
          league_id : report_noid.league_id,
          date : report_noid.date,
          report_type : report_noid.report_type,
          message : report_noid.message,
          reporter_id : report_noid.reporter_id
        };
        reports.push(report);
        localStorage.setItem('REPORT_' + league, JSON.stringify(reports));
        console.log(reports);


      }
    
  }

  getReportsByLeague(league : string) : ReportMessage[] | undefined {
    var reports = localStorage.getItem('REPORT_' + league);
    if (reports != null) {
      console.log("here");
      var tmp : ReportMessage[] = JSON.parse(reports);
      return tmp;
    }
    else {
      return undefined;
    }
  }
}
