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

    let params = new HttpParams();
    params.append('id', id);
    params.append('name', name);
    this.httpClient.put(this.prefix + 'users/edit-name', {params:params});

  }
}
