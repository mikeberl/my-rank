import { Injectable } from "@angular/core";

export interface User {
    UID: number;
    fullname: string;
    username: string; 
    profile_pic: string;
    is_admin: boolean;
    joined_leagues : string[];
}

const USER = [
    {UID: 0o1, fullname: "Michele Berlanda", username: "Smikeball", profile_pic: "", is_admin: true, joined_leagues: ['l1', 'l2']}
]

@Injectable()
export class Users {
  getUsers(): User[] {
    return USER;
  }
}
