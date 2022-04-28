import { Injectable } from "@angular/core";

export interface User {
    UID: number;
    fullname: string;
    username: string; 
    profile_pic: string;
    joined_leagues : string[];
}

const USER = [
    {UID: 1, fullname: "Michele Berlanda", username: "Smikeball", profile_pic: "", joined_leagues: ['l1', 'l2']}
]

/* @Injectable()
export class UserService {
  getUsers(): User[] {
    return USER;
  }

  getMain() : User {
    return USER[0]; 
  }
} */
