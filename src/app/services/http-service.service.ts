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

  login(username: string, password: string) {
    return this.httpClient.post<any>(this.prefix +'login', {username: username, password: password}).pipe(
      map((response) => {
        console.log(response);
        return response.user;
      })
    )
  }

  register(user : User) {
    console.log(user);
    return this.httpClient.post<any>(this.prefix +'register', { user : user}).pipe(
      map((response) => {
        console.log(response);
        return;
      }));
  }

  editName(id: number, name: string) {
    return this.httpClient.put<any>(this.prefix + 'users/edit-name', {id : id, name : name}).pipe(
      map((response) => {
        console.log(response);
        return response.name;
      })
    );
  }

  editUsername(id: number, username: string) {
    return this.httpClient.put<any>(this.prefix + 'users/edit-name', {id : id, username : username}).pipe(
      map((response) => {
        console.log(response);
        return response.name;
      })
    );
  }

  editPassword(id: number, password: string) {
    return this.httpClient.put<any>(this.prefix + 'users/edit-name', {id : id, password : password}).pipe(
      map((response) => {
        console.log(response);
        return response.name;
      })
    );
  }
}
