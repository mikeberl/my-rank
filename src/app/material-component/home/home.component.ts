import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hello$ : Observable<User> | undefined;

  ss : string | undefined;

  constructor(private httpService : HttpServiceService) { }

  ngOnInit(): void {
    /* this.ss = this.httpService.getHelloWorld();
    console.log(this.hello$); */
  }

}
