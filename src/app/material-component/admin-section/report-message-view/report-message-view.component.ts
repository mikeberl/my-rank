import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportMessage } from 'src/app/models/report-message.model';
import { PlayerService } from 'src/app/services/player.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-message-view',
  templateUrl: './report-message-view.component.html',
  styleUrls: ['./report-message-view.component.css']
})
export class ReportMessageViewComponent implements OnInit {

  reports : ReportMessage[] = [];

  league_id : string = '';
  no_reports = false;

  constructor(private reportService : ReportService,
              private route: ActivatedRoute,
              private playerService : PlayerService) {
    this.route.params.subscribe(params => {
      this.league_id = params['id'];
      var tmp = reportService.getReportsByLeague(this.league_id);
      if (tmp != undefined) {
        console.log(tmp);
        this.reports = tmp;
      }
      else {
        this.no_reports = true;
      }
    });
  }

  ngOnInit(): void {
  }

  getReporter(id : string) {
    return this.playerService.getPlayerById(this.league_id, id);  
  }

}
