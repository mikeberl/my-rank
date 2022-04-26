import { Component, OnInit } from '@angular/core';
import { ReportMessage } from 'src/app/models/report-message.model';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-message-view',
  templateUrl: './report-message-view.component.html',
  styleUrls: ['./report-message-view.component.css']
})
export class ReportMessageViewComponent implements OnInit {

  reports : ReportMessage[] = [];

  constructor(private reportService : ReportService) {
    var tmp = reportService.getReportsByLeague('l1');
    if (tmp != undefined) {
      this.reports = tmp;
    }
    else {
      
    }
    
    console.log(this.reports);
   }

  ngOnInit(): void {
  }

}
