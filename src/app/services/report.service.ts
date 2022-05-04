import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { ReportMessage, ReportMessageNoId, ReportType } from '../models/report-message.model';

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
        match_id : report_noid.match_id,
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
          match_id : report_noid.match_id,
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

  resolveReport(league : string, match : number) {
    var tmp_matches = localStorage.getItem('REPORT_'+ league);

    if (tmp_matches != null) {
      var reports : ReportMessage[] = JSON.parse(tmp_matches);
      for (let report of reports) {
        if (report.match_id.toString() === match.toString()) {
          reports.splice(reports.indexOf(report), 1);
          localStorage.setItem('REPORT_' + league, JSON.stringify(reports));
        }
      }
    }
  }

  getReportsByLeague(league : string) : ReportMessage[] | undefined {
    var reports = localStorage.getItem('REPORT_' + league);
    if (reports != null) {
      var tmp : ReportMessage[] = JSON.parse(reports);
      return tmp;
    }
    else {
      return undefined;
    }
  }

  getReportTypeString(type : ReportType) : string {
    if (type === ReportType.WRONGPOINTS) {
      return "Wrong Points";
    }
    else if (type === ReportType.WRONGPLAYERS) {
      return "Wrong Players";
    }
    else if (type === ReportType.DOUBLEINPUT) {
      return "Double Input";
    }
    else {
      return "Others";
    }
  }
}
