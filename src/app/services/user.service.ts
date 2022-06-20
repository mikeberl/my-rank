import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { League } from '../models/league.model';
import { User } from '../models/user.model';
import { HttpServiceService } from './http-service.service';

const USER = [
  {Uid: 1, name: "Michele Berlanda", username: "Smikeball", img: "", leagues: ['l1', 'l2']}
]

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ownerEmitter : EventEmitter<User> = new EventEmitter<User>();
  // ownerDestroyer : EventEmitter<User> = new EventEmitter();

  owner : User | undefined;

  constructor(private router: Router) { }

  getUsers(): User[] {
    return USER;
  }

  getOwner() : User | undefined {
    if (this.owner === undefined) {
      var tmp = localStorage.getItem("OWNER");
      if (tmp != null) {
        var owner : User = JSON.parse(tmp);
        this.owner = owner;
        this.ownerEmitter.emit(owner);
      }
    }
    return this.owner;
  }

  login(user : User) {
    localStorage.setItem("OWNER", JSON.stringify(user));
    this.owner = user;
    this.ownerEmitter.emit(user);
    //console.log(this.owner + "  logged in");
  }

  logout() {
    localStorage.removeItem("OWNER");
    this.owner = undefined;
    this.ownerEmitter.emit(undefined);
    this.router.navigate(["/login"]);
  }

  getMain() : User {
    return USER[0];
  }

  createUserFromForm(form : any) {
    const tmp : User = {
      Uid: 0,
      name: form.name,
      username: form.username,
      password: form.password,
      img: "",
      email: form.email,
      leagues : []
    }
    return tmp;
  }

  /* register(user : any) {
    this.

  } */

  editName(name : string) {
    if (this.owner) {
      this.owner.name = name;
      this.ownerEmitter.emit(this.owner);
    }
  }

  editUsername(username : string) {
    if (this.owner) {
      this.owner.username = username;
      this.ownerEmitter.emit(this.owner);
    }
  }

  editPassword(password : string) {
    if (this.owner) {
      this.owner.password = password;
      this.ownerEmitter.emit(this.owner);
    }
  }
}
