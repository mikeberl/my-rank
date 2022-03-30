import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Match } from 'src/app/models/match.model';
import { ReportMessage, ReportMessageNoId, ReportType } from 'src/app/models/report-message.model';
import { MatchService } from 'src/app/services/match.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example.html', 
  
  /* `<h1 mat-dialog-title>Hi {{data.name}}</h1>
<div mat-dialog-content>
  <p>What's your favorite animal?</p>
  <mat-form-field>
    <input matInput tabindex="1" [(ngModel)]="data.animal">
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button [mat-dialog-close]="data.animal" tabindex="2">Ok</button>
  <button mat-button (click)="onNoClick()" tabindex="-1">No Thanks</button>
</div>` */
})
export class DialogOverviewExampleDialogComponent {
  report_type : ReportType = ReportType.OTHERS;
  report_message: string="";

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reportService : ReportService,
    private matchService : MatchService
  ) { }

  onNoClick(): void {
    console.log('No');
    this.dialogRef.close();
  }

  onSubmit(form : NgForm) {
    
    var new_report : ReportMessageNoId = {
      game_id : this.data.match.game_id,
      league_id : this.data.match.league_id,
      reporter_id : this.data.reporter_id,
      message : form.value.message,
      date : Date.now().toString(),
      report_type : form.value.report_type     
    }
    
    this.reportService.addReport('l1', new_report);
    this.matchService.reportMatch('l1', this.data.match);
    this.data.match.was_reported = true;
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  animal: string='';
  name: string='';

  constructor(public dialog: MatDialog) { }

  openDialog(reporter_id : number, match : Match): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { reporter_id : reporter_id, match: match }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
