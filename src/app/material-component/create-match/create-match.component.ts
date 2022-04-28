import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { RankedPlayer, RankedPlayers } from 'src/app/models/ranked-player.model';
import { Match, MatchItems, MatchNoId } from 'src/app/models/match.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss']
})
export class CreateMatchComponent {
  
  arr_player: RankedPlayer[] = [];
  arr_player_copy: RankedPlayer[] = [];
  arr_winners : RankedPlayer[] = [];
  arr_losers: RankedPlayer[] = [];

  title = "Create Match";

  league_id : string = "";
  user : User;

  constructor(/* private navbarService : NavbarServiceService, */
              private router: Router,
              private route: ActivatedRoute,
              private userService : UserService,
              private playerService : PlayerService,
              private matchService : MatchService) {
                this.user = userService.getUsers()[0];
  }

  ngOnInit(): void {
    /* this.navbarService.selectNavbarBack();
    this.navbarService.navbarBackTitle(this.title); */
    this.route.params.subscribe(params => {
      console.log(params['id']) //log the value of id
      this.league_id = params['id'];
      this.arr_player = this.playerService.getRankedPlayersByLeague(this.league_id);
      console.log(this.arr_player);
    });
  }

  // Add to winning team
  addToWinners(player : RankedPlayer) {
    var tmp_player = this.arr_player.splice(this.arr_player.indexOf(player), 1)[0];
    this.arr_winners.push(tmp_player);
  }

  // Add to losing team
  addToLosers(player : RankedPlayer) {
    var tmp_player = this.arr_player.splice(this.arr_player.indexOf(player), 1)[0];
    this.arr_losers.push(tmp_player);
  }

  // Add to search list
  restorePlayer(player : RankedPlayer, list : number) {
    var tmp_player : RankedPlayer;
    if (list === 1) {
      tmp_player = this.arr_winners.splice(this.arr_winners.indexOf(player), 1)[0];
      this.arr_player.push(tmp_player);
    }
    else {
      tmp_player = this.arr_losers.splice(this.arr_losers.indexOf(player), 1)[0];
      this.arr_player.push(tmp_player);
    }
    // should not happend
    console.log(player);
    console.log(tmp_player);
    console.log(this.arr_losers);
    console.log(this.arr_winners);
    
  }

  // swap team
  changeToLoser(player : RankedPlayer) {
    this.arr_winners.splice(this.arr_winners.indexOf(player), 1);
    this.arr_losers.push(player);
  }

  // swap team
  changeToWinner(player : RankedPlayer) {
    this.arr_losers.splice(this.arr_winners.indexOf(player), 1);
    this.arr_winners.push(player);
  }

  onSubmit(form : NgForm) {
    
    // this.router.navigate(['/']);
    if (this.arr_winners.length === 0 || this.arr_losers.length === 0) {
      this.alertError();
    }
    else if (this.arr_losers.length === this.arr_winners.length) {
      var new_match : MatchNoId = this.createMatch(form);
      this.matchService.newMatch(this.league_id, new_match);
      this.alertConfirmationEqual();

    }
    else {
      var new_match : MatchNoId = this.createMatch(form);
      this.matchService.newMatch(this.league_id, new_match);
      this.alertConfirmationNotEqual();
    }
  }

  createMatch(form : NgForm) : MatchNoId {
    var match : MatchNoId = {league_id : this.league_id, 
                player_id: this.playerService.getPlayerByUserAndLeague(this.user.UID, this.league_id)?.id,
              winners: this.arr_winners, losers: this.arr_losers, points: form.value.points, date : form.value.date, was_reported: false};

    return match;
  }

  clearStorage() {
    this.matchService.clearMatches();
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

  alertConfirmationNotEqual() {
    Swal.fire({
      title: 'Confirm result registration',
      text: 'Winners and losers are not equal. Do you still want to confirm? The team with less players will get double the points calculation.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Registered!', 'Your game has been registered successfully.', 'success');
        this.router.navigate(['/']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your registration has been stopped', 'error');
      }
    });
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
