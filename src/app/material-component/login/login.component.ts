import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  registerForm: FormGroup;

  constructor(private httpService : HttpServiceService,
              private userService : UserService,
              private router: Router,
              private formBuilder: FormBuilder, ) {
    
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

    if (this.registerForm.invalid) {
      return;
    }
    this.httpService.login(this.registerForm.value.username, this.registerForm.value.password).pipe(
      map((user : User) => {
        this.userService.login(user);
        this.router.navigate(['/']);
      })
    ).subscribe()
     
  }

  login() {
  }

  getHello() {
    console.log(this.httpService.getHelloWorld().subscribe());
  }
}
