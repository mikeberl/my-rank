import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { League } from '../models/league.model';

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


  constructor(private httpClient : HttpClient,
              private userService: UserService) { }

/////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  editName(id: number, name: string) {
    const owner = this.userService.getOwner();
    if (owner === undefined) {
      this.userService.logout();
    }
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + owner?.access_token })
    };
    return this.httpClient.put<any>(this.prefix + 'users/edit-name', {id : id, name : name}, httpOptions).pipe(
      map((response) => {
        console.log(response);
        return response.name;
      })
    );
  }

  editUsername(id: number, username: string) {
    const owner = this.userService.getOwner();
    if (owner === undefined) {
      this.userService.logout();
    }
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + owner?.access_token })
    };
    return this.httpClient.put<any>(this.prefix + 'users/edit-name', {id : id, username : username}, httpOptions).pipe(
      map((response) => {
        console.log(response);
        return response.name;
      })
    );
  }

  editPassword(id: number, password: string) {
    const owner = this.userService.getOwner();
    if (owner === undefined) {
      this.userService.logout();
    }
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + owner?.access_token })
    };
    
    return this.httpClient.put<any>(this.prefix + 'users/edit-name', {id : id, password : password}, httpOptions).pipe(
      map((response) => {
        console.log(response);
        return response.name;
      })
    );
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////

  getLeaguesByUser(Uid : number) {
    const owner = this.userService.getOwner();
    if (owner === undefined) {
      this.userService.logout();
    }
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + owner?.access_token }),
      params: new HttpParams().set('Uid', Uid)
    };
    //var httpParams = new HttpParams().set('Uid', Uid);
    // httpParams.append('Uid', Uid);
    console.log("Asking leagues of user " + owner?.Uid + "  or  " + Uid);
    return this.httpClient.get<any>(this.prefix + 'leagues/by-user', httpOptions).pipe(
      map( (response) => {
        console.log(response.leagues);
        return response.leagues;
      })
    );
  }

  getJoinableLeagues(Uid : number) {
    const owner = this.userService.getOwner();
    if (owner === undefined) {
      this.userService.logout();
    }
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + owner?.access_token }),
      params: new HttpParams().set('Uid', Uid)
    };
    //var httpParams = new HttpParams().set('Uid', Uid);
    // httpParams.append('Uid', Uid);
    console.log("Asking leagues of user " + owner?.Uid + "  or  " + Uid);
    return this.httpClient.get<any>(this.prefix + 'leagues/not-joined', httpOptions).pipe(
      map( (response) => {
        console.log(response.leagues);
        return response.leagues;
      })
    );
  }

  joinLeague(Uid : number, Lid : number) {
    const owner = this.userService.getOwner();
    if (owner === undefined) {
      this.userService.logout();
    }
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + owner?.access_token }),
    };

    return this.httpClient.post<any>(this.prefix + 'leagues/register', {Uid : Uid, Lid : Lid}, httpOptions).pipe(
      map((response) => {
        console.log(response);
        return;
      })
    );
  }

  leaveLeague(Uid : number, Lid : number) {
    const owner = this.userService.getOwner();
    if (owner === undefined ) {
      this.userService.logout();
    }
      var httpParams = new HttpParams().set('Uid', Uid).set('Lid', Lid);
      // httpParams
      var httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + owner?.access_token }),
        params : httpParams
      };
  
      return this.httpClient.delete<any>(this.prefix + 'leagues/leave', httpOptions).pipe(
        map((response) => {
          return response;
        })
      );
  }


  createLeague(name : string, city : string, sport : string) {
    const owner = this.userService.getOwner();
    if (owner === undefined ) {
      this.userService.logout();
    }
      var httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + owner?.access_token }),
      };
  
      return this.httpClient.post<any>(this.prefix + 'leagues/create', { name : name, city : city, sport : sport, admin_id : owner?.Uid }, httpOptions).pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }
}
