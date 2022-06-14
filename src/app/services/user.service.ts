import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { User } from '../models/user.model';

const USER = [
  {UID: 1, fullname: "Michele Berlanda", username: "Smikeball", profile_pic: "", joined_leagues: ['l1', 'l2']}
]

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ownerEmitter : EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  getUsers(): User[] {
    return USER;
  }

  getOwner() : User | undefined {
    var tmp = localStorage.getItem("MAIN");
    if (tmp != null) {
      var owner : User = JSON.parse(tmp);
      return owner;
    }
    return undefined;
  }

  getMain() : User {
    return USER[0];
  }
}
