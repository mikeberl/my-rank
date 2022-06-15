import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  owner : User | undefined;

  constructor(private httpService : HttpServiceService,
              private userService : UserService) {
    this.owner = this.userService.getOwner();
    userService.ownerEmitter.subscribe(o => {
      this.owner = o;
    })

    userService.ownerDestroyer.subscribe(o => {
      this.owner = undefined;
    })
      
  }

  ngOnInit(): void {
  }

}
