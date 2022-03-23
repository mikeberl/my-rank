import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss']
})
export class CreateMatchComponent {
  tiles = [
    {
      text: 'One',
      cols: 3,
      rows: 1,
      color: 'lightblue'
    },
    {
      text: 'Two',
      cols: 1,
      rows: 2,
      color: 'lightgreen'
    },
    {
      text: 'Three',
      cols: 1,
      rows: 1,
      color: 'lightpink'
    },
    {
      text: 'Four',
      cols: 2,
      rows: 1,
      color: '#DDBDF1'
    }
  ];

  leaguePlayers: string[] = ['Marco', 'Roberto', 'Giulio', 'Maria', 'Giorgia'];
  backup_leaguePlayers: string[] = ['Marco', 'Roberto', 'Giulio', 'Maria', 'Giorgia'];
  selectedPlayers_1: string[];
  selectedPlayers_2: string[];

  title = "Create Match";

  constructor(/* private navbarService : NavbarServiceService, */
              private router: Router) {
    this.selectedPlayers_1 = [];
    this.selectedPlayers_2 = [];
  }

  ngOnInit(): void {
    /* this.navbarService.selectNavbarBack();
    this.navbarService.navbarBackTitle(this.title); */
  }

  manageSelectedPlayer(player : string) {
    console.log("Managing selected players");
    if (this.selectedPlayers_1.indexOf(player) === -1 && this.selectedPlayers_2.indexOf(player)) {
      console.log(player + "will be added");
      this.selectedPlayers_1.push(player);
    }
    /* else {
      console.log(player + "will be removed");
      this.selectedPlayers_1.splice(this.selectedPlayers_1.indexOf(player), 1);
    } */
  }

  removePlayer(player : string, list : number) {
    if (list === 1) {
      this.selectedPlayers_1.splice(this.selectedPlayers_1.indexOf(player), 1);
    }
    else {
      this.selectedPlayers_2.splice(this.selectedPlayers_1.indexOf(player), 1);
    }
  }

  changeToSecondTeam(player : string) {
    this.selectedPlayers_1.splice(this.selectedPlayers_1.indexOf(player), 1);
    this.selectedPlayers_2.push(player);
  }

  changeToFirstTeam(player : string) {
    this.selectedPlayers_2.splice(this.selectedPlayers_1.indexOf(player), 1);
    this.selectedPlayers_1.push(player);
  }

  onSubmit(form : NgForm) {
    console.log(form);
    var winners = 0;
    for (let selected of form.value.winners) {
      if (this.selectedPlayers_1.indexOf(selected) === -1) {
        console.log("Should never happen");
      }
      else {
        winners++;
      }
    }
    var losers = this.selectedPlayers_1.length - winners;
    console.log("There are " + winners + " winners");
    console.log("There are " + losers + " losers");
    console.log("Points are : " + form.value.points);
    // this.router.navigate(['/']);
    if ((winners === 0) || (this.selectedPlayers_1.length == 0) || (losers == 0)) {
      this.alertError();
    }
    else if (winners === losers) {
      this.alertConfirmationEqual();
    }
    else {
      this.alertConfirmationNotEqual();
    }
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
        this.router.navigate(['/']);
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
    console.log((document.getElementById('nts') as HTMLInputElement).value);
    var player = (document.getElementById('nts') as HTMLInputElement).value as string;
    this.leaguePlayers = [];
    for (let str of this.backup_leaguePlayers)
    {
      var low_str = str.toLowerCase();
      if (low_str.search(player) == -1 ) { 
        console.log(str + " should not appear "); 
      } else { 
        console.log(str + " saved." ); 
        this.leaguePlayers.push(str);
     } 
    }
    if (this.leaguePlayers.length < 1) {
      this.leaguePlayers = this.backup_leaguePlayers;
    }
    (document.getElementById('nts') as HTMLInputElement).value = "";
  }

}
