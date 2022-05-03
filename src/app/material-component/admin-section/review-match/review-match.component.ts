import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-review-match',
  templateUrl: './review-match.component.html',
  styleUrls: ['./review-match.component.css']
})
export class ReviewMatchComponent implements OnInit {

  league_id : string = "";
  match_id : number = 0; 
  match : Match = {id : 999, player_id : 'p1', league_id : 'l1', winners: [],
  losers: [], winned_points: 15, loosed_points: 15, date : '01-01-2001', was_reported: true};

  constructor(private matchService : MatchService,
              private reportService : ReportService,
              private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => {
      this.league_id = params['league'];
      this.match_id = params['match'];
      var tmp = matchService.getMatch(this.league_id, this.match_id);
      if (tmp != undefined) {
        this.match = tmp;
      }
      else {}
      console.log(this.match);
    });
    
  
  }

  ngOnInit(): void {
  }

  changePoints() {
    this.match.winned_points = 999;
    this.matchService.modifyMatchPoints(this.match);
    this.reportService.resolveReport(this.league_id, this.match_id);
  }
}
