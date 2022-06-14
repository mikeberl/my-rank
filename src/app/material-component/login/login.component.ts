import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hello$: Observable<string> | undefined;

  constructor(private httpService : HttpServiceService,
              private router: Router,
              ) { }

  ngOnInit(): void {
  }

  login() {
    this.httpService.login().pipe(
      map(token => this.router.navigate(['/']))
    ).subscribe()
  }

  getHello() {
    console.log(this.httpService.getHelloWorld().subscribe());
  }
}
