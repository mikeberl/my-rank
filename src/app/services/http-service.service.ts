import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { map, catchError } from 'rxjs/operators';

const login_data = 
  {
    username: 'Mike',
    password: '111',
  }


@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  prefix : string = 'http://localhost:3000/';

  data : any;


  constructor(private httpClient : HttpClient) { }


  getHelloWorld() {
    return this.httpClient.get<string>(this.prefix).pipe(
      map((userData: any) => userData),
      catchError(err => throwError(err))
    )
  }

  login() {
    return this.httpClient.post<any>(this.prefix +'login', {username: login_data.username, password: login_data.password}).pipe(
      map((response) => {
        //var tmp = parseUser(user);
        //localStorage.setItem("OWNER_TOKEN", token.access_token);
        return response.user;
      })
    )
  }
}
