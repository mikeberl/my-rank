import { Component, Input } from '@angular/core';
/* import { User } from './models/user.model';
import { UserService } from './services/user.service'; */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  /* @Input()
  owner : User | undefined; */

  constructor(/* private userService : UserService */) {
    /* this.owner = userService.getOwner();

    userService.ownerEmitter.subscribe(o => {
      this.owner = o;
    }) */

    /* userService.ownerDestroyer.subscribe(o => {
      this.owner = undefined;
    }) */
  }
}
