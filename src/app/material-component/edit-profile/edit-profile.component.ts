import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  id_ : number;

  constructor(private httpService: HttpServiceService,
              private userService: UserService,
              private route: ActivatedRoute) {
    
    this.id_ = 0; // TODO check if something goes wrong
    this.route.params.subscribe(params => {
      this.id_ = +params['id'];
    });
               }

  ngOnInit(): void {
  }

  editName() {
    this.httpService.editName(this.id_, "Giulio").pipe(
      map((name : string) => {
        this.userService.editName(name);
      })
    ).subscribe();
  }

  editUsername() {
    this.httpService.editName(this.id_, "Giulio").pipe(
      map((name : string) => {
        this.userService.editUsername(name);
      })
    ).subscribe();
  }

  editPassword() {
    this.httpService.editName(this.id_, "Giulio").pipe(
      map((name : string) => {
        this.userService.editPassword(name);
      })
    ).subscribe();
  }

}
