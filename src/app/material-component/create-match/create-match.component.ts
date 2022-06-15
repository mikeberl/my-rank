import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { RankedPlayer } from 'src/app/models/ranked-player.model';
import { Match, MatchNoId } from 'src/app/models/match.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';
import { StorageService } from 'src/app/services/storage.service';
import { MatChip } from '@angular/material/chips';

interface Chip {
  value : number;
  state : boolean;
}

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

  league_id : string = "";
  user : User;

  selected_chip : Chip | undefined;

  winned_points = 0;
  loosed_points = 0;
  multiplier = 0;

  max_point = 60; // TODO add max point to league

  chips : Chip[] = [
    {value : 5, state: false},
    {value : 10, state: false},
    {value : 15, state: false},
    {value : 20, state: false},
    {value : 25, state: false},
    {value : 30, state: false},
  ];

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
      this.league_id = params['id'];
      this.arr_player = this.storage.getActivePlayersByLeague(this.league_id);
      console.log(this.arr_player);
    });
  }

  // Add to winning team
  addToWinners(player : RankedPlayer) {
    var tmp_player = this.arr_player.splice(this.arr_player.indexOf(player), 1)[0];
    this.arr_winners.push(tmp_player);
    this.changeMultiplier(this.multiplier);
  }

  // Add to losing team
  addToLosers(player : RankedPlayer) {
    var tmp_player = this.arr_player.splice(this.arr_player.indexOf(player), 1)[0];
    this.arr_losers.push(tmp_player);
    this.changeMultiplier(this.multiplier);
  }

  // Add to search list
  restorePlayer(player : RankedPlayer, list : number) {
    var tmp_player : RankedPlayer;
    if (list === 1) {
      tmp_player = this.arr_winners.splice(this.arr_winners.indexOf(player), 1)[0];
      this.arr_player.push(tmp_player);
      this.changeMultiplier(this.multiplier);
    }
    else {
      tmp_player = this.arr_losers.splice(this.arr_losers.indexOf(player), 1)[0];
      this.arr_player.push(tmp_player);
      this.changeMultiplier(this.multiplier);
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
    this.changeMultiplier(this.multiplier);
  }

  // swap team
  changeToWinner(player : RankedPlayer) {
    this.arr_losers.splice(this.arr_winners.indexOf(player), 1);
    this.arr_winners.push(player);
    this.changeMultiplier(this.multiplier);
  }

  onSubmit(form : NgForm) {
    
    // this.router.navigate(['/']);
    if (this.arr_winners.length === 0 || this.arr_losers.length === 0) {
      this.alertError();
    }
    else if (this.multiplier === 0) {
      this.alertNoPoints();
    }
    else if ((this.winned_points % 5) != 0 || (this.loosed_points % 5) != 0) {
      this.alertInvalidPoints();
    }
    else {
      var new_match : MatchNoId = this.createMatch(form);
      this.matchService.newMatch(this.league_id, new_match);
      this.alertConfirmationEqual();
    }
  }

  createMatch(form : NgForm) : MatchNoId {
    console.log(form.value.date);
    var match : MatchNoId = {league_id : this.league_id, 
                player_id: this.playerService.getPlayerByUserAndLeague(this.user.id, this.league_id)?.id,
              winners: this.arr_winners, losers: this.arr_losers, winned_points: this.winned_points, loosed_points: this.loosed_points,
              date : form.value.date.toString(), was_reported: false};

    return match;
  }

  selectChip(chip : Chip) {
    // tmp needend for avoiding nested this in findIndex
    var tmp = this.selected_chip;
    if (tmp === undefined) {
      this.selected_chip = chip;
      this.changeMultiplier(chip.value);
      return;
    }
    else {
      var index = this.chips.findIndex(function(x, index) {
        if(x.value === tmp?.value)
          return true;
      });
      this.chips[index].state = false;
      if (this.selected_chip != chip) {
        this.selected_chip = chip;
      }
      else {
        this.selected_chip = undefined;
        this.multiplier = 0;
      } 
      this.changeMultiplier(chip.value);
    }
  }

  changeMultiplier(multiplier : number) {
    if (this.arr_winners.length === this.arr_losers.length) {
      this.winned_points = multiplier;
      this.loosed_points = multiplier;
    }
    else if (this.arr_winners.length > this.arr_losers.length) {
      this.loosed_points = multiplier / this.arr_losers.length * this.arr_winners.length;
      this.winned_points = multiplier;
    }
    else if (this.arr_winners.length < this.arr_losers.length) {
      this.winned_points = multiplier / this.arr_winners.length * this.arr_losers.length;
      this.loosed_points = multiplier;
    }
    else {
      console.log("Impossible to modify the multiplier.");
    }
    this.multiplier = multiplier;
    
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
    if (form.valid === true && this.winned_points <= this.max_point  && this.loosed_points <= this.max_point) {
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
