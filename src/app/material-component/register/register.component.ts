import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs-compat/operator/first';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        //private authenticationService: AuthenticationService,
        private userService: UserService,
        private httpService: HttpServiceService
    ) {
        // redirect to home if already logged in
        /* if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        } */
        this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          username: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    ngOnInit() {
        
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        var user : User = this.userService.createUserFromForm(this.registerForm.value);
        this.httpService.register(user).pipe(
          map(() => {
            this.router.navigate(['/login']);
          })
        ).subscribe()
        /* this.httpService.register(user)
            .pipe(map( {
              return 1;
            }
            )) */
    }

}
