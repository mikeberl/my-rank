
export interface User {
    UID: number;
    fullname: string;
    username: string; 
    profile_pic: string;
    joined_leagues : string[];
}



/* @Injectable()
export class UserService {
  getUsers(): User[] {
    return USER;
  }

  getMain() : User {
    return USER[0]; 
  }
} */
