import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PointsEntry } from 'src/app/models/points-entry.model';
import { RankedPlayer } from 'src/app/models/ranked-player.model';
import { Event, EventType } from 'src/app/models/special-event.model';
import { User } from 'src/app/models/user.model';
import { MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface Chip {
  value : number;
  state : boolean;
}

@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.css']
})
export class SpecialEventComponent implements OnInit {
  
  arr_player: RankedPlayer[] = [];
  arr_player_copy: RankedPlayer[] = [];
  arr_winners : RankedPlayer[] = [];

  league_id : string = "";
  user : User;

  selected_chip : Chip | undefined;

  max_point = 60; // TODO add max point to league

  constructor(/* private navbarService : NavbarServiceService, */
              private router: Router,
              private route: ActivatedRoute,
              private userService : UserService,
              private playerService : PlayerService,
              private matchService : MatchService,
              private storage : StorageService) {
                this.user = userService.getUsers()[0];
  }

  ngOnInit(): void {
    /* this.navbarService.selectNavbarBack();
    this.navbarService.navbarBackTitle(this.title); */
    this.route.params.subscribe(params => {
      this.league_id = params['league'];
      this.arr_player = this.storage.getActivePlayersByLeague(this.league_id);
      console.log(this.arr_player);
    });
  }

  // Add to winning team
  addToWinners(player : RankedPlayer) {
    var tmp_player = this.arr_player.splice(this.arr_player.indexOf(player), 1)[0];
    this.arr_winners.push(tmp_player);
  }

  // Add to search list
  restorePlayer(player : RankedPlayer) {
    var tmp_player : RankedPlayer;

    tmp_player = this.arr_winners.splice(this.arr_winners.indexOf(player), 1)[0];
    this.arr_player.push(tmp_player);
    // should not happend
    console.log(player);
    console.log(tmp_player);
    console.log(this.arr_winners);
    
    
  }

  onSubmit(form : NgForm) {
    console.log(form);
    for(let player of this.arr_winners) {
      if (form.controls[player.id].value % 5 != 0) {
        this.alertError();
        console.log("invalid points");
        return;
      }
    }
    // this.router.navigate(['/']);
    if (this.arr_winners.length === 0) {
      this.alertError();
    }
    else {
      var new_event : Event = this.createEvent(form);
      this.matchService.newEvent(new_event);
      this.alertConfirmationEqual();
    }
  }

  createEvent(form : NgForm) {
    var eventelement : PointsEntry[] = [];
    for (let player_ of this.arr_winners) {
      var points_ = form.controls[player_.id].value;
      var entry : PointsEntry = {
        id : 0,
        player : player_,
        match : null,
        points: points_
      }
      entry.id = this.storage.newPointsEntry(entry);      
      eventelement.push(entry);
    }
    var event : Event = {
      id : 0,
      league_id : this.league_id,
      points : eventelement,
      date : form.controls['date'].value.toString(),
      was_reported : false,
      event_type : EventType.OTHER
    }
    for (let e of event.points) {
      e.match = event;
    }
    return event;
  }

  alertError() {
    Swal.fire({
      title: 'Error by your registration',
      text: 'you need to insert at least 1 winner and 1 user',
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'Ok'
    })
  }

  alertNoPoints() {
    Swal.fire({
      title: 'No points selected',
      text : 'Please insert the points that every partecipant of the smallest team will get or loose',
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'Ok'
    })
  }

  alertInvalidPoints() {
    Swal.fire({
      title: 'Invalid points',
      text : 'All the points need to be multiple of 5.',
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'Ok'
    })
  }

  alertConfirmationEqual() {
    Swal.fire({
      title: 'Confirm result registration',
      text: 'This process is irreversible.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Registered!', 'Your game has been registered successfully.', 'success');
        // this.router.navigate(['/']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your registration has been stopped', 'error');
      }
    });
  }

  disableSubmit(form : NgForm) {
    if (form.valid === true) {
      return false;
    }
    else {
      return true;
    }
  }

  search() {
    /* console.log((document.getElementById('nts') as HTMLInputElement).value);
    var player = (document.getElementById('nts') as HTMLInputElement).value as string;
    this.arr_player = [];
    for (let str of this.arr_player_copy)
    {
      var low_str = str.toLowerCase();
      if (low_str.search(player) == -1 ) { 
        console.log(str + " should not appear "); 
      } else { 
        console.log(str + " saved." ); 
        this.arr_player.push(str);
     } 
    }
    if (this.arr_player.length < 1) {
      this.arr_player = this.arr_player_copy;
    }
    (document.getElementById('nts') as HTMLInputElement).value = ""; */
  }

}
