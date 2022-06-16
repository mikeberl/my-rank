import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
  }

  editName() {
    this.httpService.editName(1, "Marco");
  }

}
