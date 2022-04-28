import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const USER = [
  {UID: 1, fullname: "Michele Berlanda", username: "Smikeball", profile_pic: "", joined_leagues: ['l1', 'l2']}
]

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): User[] {
    return USER;
  }

  getMain() : User {
    return USER[0]; 
  }
}
