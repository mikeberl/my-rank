import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hello$: Observable<string> | undefined;

  constructor(private httpService : HttpServiceService,
              private userService : UserService,
              private router: Router,
              ) { }

  ngOnInit(): void {
  }

  login() {
    this.httpService.login().pipe(
      map((user : User) => {
        this.userService.login(user);
        this.router.navigate(['/']);
      })
    ).subscribe()
  }

  getHello() {
    console.log(this.httpService.getHelloWorld().subscribe());
  }
}
