import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { User } from '../models/user.model';

const USER = [
  {id: 1, name: "Michele Berlanda", username: "Smikeball", img: "", leagues: ['l1', 'l2']}
]

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ownerEmitter : EventEmitter<User> = new EventEmitter<User>();
  ownerDestroyer : EventEmitter<User> = new EventEmitter();

  owner : User | undefined;

  constructor() { }

  getUsers(): User[] {
    return USER;
  }

  getOwner() : User | undefined {
    if (this.owner === undefined) {
      var tmp = localStorage.getItem("OWNER");
      if (tmp != null) {
        console.log(tmp);
        var owner : User = JSON.parse(tmp);
        this.owner = owner;
      }
    }
    return this.owner;
  }

  login(user : User) {
    localStorage.setItem("OWNER", JSON.stringify(user));
    this.owner = user;
    this.ownerEmitter.emit(user);
  }

  logout() {
    localStorage.removeItem("OWNER");
    this.owner = undefined;
    this.ownerDestroyer.emit();
  }

  getMain() : User {
    return USER[0];
  }

  createUserFromForm(form : any) {
    const tmp : User = {
      id: 0,
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
}
