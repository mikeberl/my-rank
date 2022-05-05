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

  changePoints() {
    if (this.match != undefined) {
      this.match.winned_points = 999;
      this.matchService.modifyMatchPoints(this.match);
      this.reportService.resolveReport(this.league_id, this.report_id); //TODO CHECK!!
    }  
  }

  getPlayer(id : string) {
    var player = this.playerService.getPlayerById(this.league_id, id);
    return player;
  }
}
