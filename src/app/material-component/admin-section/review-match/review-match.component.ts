import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { ReportMessage } from 'src/app/models/report-message.model';
import { MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-review-match',
  templateUrl: './review-match.component.html',
  styleUrls: ['./review-match.component.css']
})
export class ReviewMatchComponent implements OnInit {

  league_id : string = "";
  report_id : number = 0; 
  match : Match | undefined = undefined;
  report : ReportMessage | undefined = undefined;
  change_check = false;

  constructor(private matchService : MatchService,
              private reportService : ReportService,
              private playerService : PlayerService,
              private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => {
      this.league_id = params['league'];
      this.report_id = params['report'];
      this.report = reportService.getReportById(this.league_id, this.report_id);
      if (this.report != undefined) {
        this.match = matchService.getMatch(this.league_id, this.report?.match_id);
        if (this.match === undefined) {
          console.log("match not found");
        }
      } 
      else {
        console.log("Report not found");
      }
    });
  }

  ngOnInit(): void {
  }

  changePoints(list : number, points: number) {
    if (this.match != undefined) {
      if (list === 0) {
        if (this.match.winned_points != points) {
          this.change_check = true;
        }
        this.match.winned_points = points;
        this.match.loosed_points = points;  
      }
      else if (list === 1) {
        if (this.match.loosed_points != points) {
          this.change_check = true;
        }
        this.match.winned_points = points / this.match.losers.length * this.match.winners.length;
        this.match.loosed_points = points;
      }
      else if (list === 2) {
        if (this.match.winned_points != points) {
          this.change_check = true;
        }
        this.match.winned_points = points;
        this.match.loosed_points = points / this.match.winners.length * this.match.losers.length;
      }         
    }  
  }

  saveMatch() {
    if (this.match != undefined) {
      if ((this.match.winned_points % 5) === 0 && (this.match.loosed_points % 5) === 0) {
        this.matchService.modifyMatch(this.match);
        this.reportService.resolveReport(this.league_id, this.report_id); //TODO CHECK!!
      }
    }
  }

  deleteMatch() {
    if (this.match != undefined) {
      this.reportService.resolveReport(this.league_id, this.report_id); //TODO CHECK!!
      this.matchService.deleteMatch(this.match);
    }
  }

  getPlayer(id : string) {
    var player = this.playerService.getPlayerById(this.league_id, id);
    return player;
  }
}
