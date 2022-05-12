import { Injectable } from '@angular/core';
import { League } from '../models/league.model';
import { RankedPlayer } from '../models/ranked-player.model';
import { User } from '../models/user.model';
import { PlayerService } from './player.service';

const LEAGUEITEMS = [
  {id : 'l1', name: 'Roundnet BZ', city: 'Bolzano', sport: 'Roundnet', max_players : 10, admin_id : 1, picture_url: '/assets/images/users/1.jpg', active: true, end: new Date('22/04/2025')},
  {id : 'l2', name: 'Roundnet Padova', city: 'Padova', sport: 'Roundnet', max_players : 120, admin_id : 2, picture_url: '/assets/images/users/2.jpg', active: true, end: new Date('22/04/2025')},
  {id : 'l3', name: 'Roundnet Graz', city: 'Graz', sport: 'Roundnet', max_players : 30, admin_id : 1, picture_url: '/assets/images/users/3.jpg', active: true, end: new Date('22/04/2025')},
  {id : 'l4', name: 'Roundnet Monaco', city: 'Monaco', sport: 'Roundnet', max_players : 10, admin_id : 3, picture_url: '/assets/images/users/4.jpg', active: true, end: new Date('22/04/2025')},
  {id : 'l5', name: 'Roundnet Milano', city: 'Milano', sport: 'Roundnet', max_players : 20, admin_id : 4, picture_url: '/assets/images/users/5.jpg', active: false, end: new Date('22/04/2025')},  
]

const USER = [
  {UID: 1, fullname: "Michele Berlanda", username: "Smikeball", profile_pic: '/assets/images/users/1.jpg', joined_leagues: ['l1', 'l2']},
  {UID: 2, fullname: "Piero Magi", username: "Pier", profile_pic: '/assets/images/users/2.jpg', joined_leagues: ['l1', 'l2', 'l4']},
  {UID: 3, fullname: "Maria Antonietta", username: "Trodena", profile_pic: '/assets/images/users/3.jpg', joined_leagues: ['l2']},
  {UID: 4, fullname: "Marco Brown", username: "Sniper", profile_pic: '/assets/images/users/d1.jpg', joined_leagues: ['l3', 'l2']},
  {UID: 5, fullname: "Giulio Giulio", username: "Giulio", profile_pic: '/assets/images/users/4.jpg', joined_leagues: ['l3', 'l2', 'l1']}
]

/* const RANKEDPLAYERS = [
  { id: 'p1', UID: 1, fullname: 'Michele Berlanda', points: 0, picture_url: '/assets/images/users/1.jpg', matches: [], active: true},
  { id: 'p2', UID: 2, fullname: 'Piero Magi', points: 0, picture_url: '/assets/images/users/2.jpg', matches: [], active: true},
  { id: 'p3', UID: 3, fullname: 'Luca Arsev', points: 0, picture_url: '/assets/images/users/3.jpg', matches: [], active: true},
  { id: 'p4', UID: 4, fullname: 'Lucia Dandolomea', points: 0, picture_url: '/assets/images/users/4.jpg', matches: [], active: true},
  { id: 'p5', UID: 1, fullname: 'Asah Moah', points: 0, picture_url: '/assets/images/users/5.jpg', matches: [], active: true},
  { id: 'p99', UID: 9, fullname: 'ERROR', points: 0, picture_url: '/assets/images/users/6.jpg', matches: [], active: false}   
] */

@Injectable({
  providedIn: 'root'
})


export class GeneratorService {


  report_prefix : string = "REPORT_";
  matches_prefix : string = "MATCHES_";
  players_prefix : string = "PLAYERS_";
  leagues_prefix : string = "LEAGUES_";
  users_prefix : string = "USERS_";
  events_prefix : string = "EVENTS_";

  users_: User[] = USER;
  leagues_ : League[] = LEAGUEITEMS;
  players_ : RankedPlayer[] = [];

  generationDone : boolean = false;

  constructor() {   }

  getLeagueitem(): League[] {
    return LEAGUEITEMS;
  }

  generate() {
    console.log("Generating testing data");
    if (localStorage.getItem(this.users_prefix) != null) {
      console.log("TO BE FIXED: Dummy block for avoing data generation");
    }
    else {
      for(let user of this.users_) {
        for(let league of user.joined_leagues) {
          var players_string = localStorage.getItem(this.players_prefix + league);
          var new_player = this.newPlayer(league, user, players_string);
          var players : RankedPlayer[] = [];
          if (players_string === null) {  
            players.push(new_player);          
          }
          else {
           players  = JSON.parse(players_string);
            players.push(new_player);
          }
          localStorage.setItem(this.players_prefix + league, JSON.stringify(players));
        }
      }
      localStorage.setItem(this.leagues_prefix, JSON.stringify(this.leagues_));
      localStorage.setItem(this.users_prefix, JSON.stringify(this.users_));
      this.generationDone = true;
    }
  }

  newPlayer(league : string, user : User, players_string : string | null) {
    if (players_string === null) {
      var player : RankedPlayer = {
        id : 'p0',
        UID : user.UID,
        fullname : user.fullname,
        points : 0,
        picture_url : user.profile_pic, 
        matches: [], 
        events: [],
        active: true};
      return player;  
    }
    else {
      var players : RankedPlayer[]= JSON.parse(players_string);
      var player : RankedPlayer = {
        id : 'p' + players.length.toString(),
        UID : user.UID,
        fullname : user.fullname,
        points : 0,
        picture_url : user.profile_pic,  
        matches: [],
        events: [],
        active: true};
      players.push(player);

      return player;    
    }
  }

}
