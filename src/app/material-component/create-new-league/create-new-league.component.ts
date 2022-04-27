import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { League, LeagueItems } from 'src/app/models/league.model';
import { StorageService } from 'src/app/services/storage.service';
import { Users } from 'src/app/models/user.model';


@Component({
  selector: 'app-create-new-league',
  templateUrl: './create-new-league.component.html',
  styleUrls: ['./create-new-league.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
}]
})
export class CreateNewLeagueComponent implements OnInit {
	imgFile: string = '';
	isLinear = false;
	
	formGroup : FormGroup=Object.create(null);

	constructor(private _formBuilder: FormBuilder,
				private storage: StorageService,
				private userService: Users) {}

	ngOnInit() {
		this.formGroup = this._formBuilder.group({
			firstFormGroup : this._formBuilder.group({
				nameCtrl: new FormControl('', [Validators.required])
			}),
			secondFormGroup : this._formBuilder.group({
				file: new FormControl('', [Validators.required]),
				imgSrc: new FormControl('', [Validators.required])
			}),
			thirdFormGroup : this._formBuilder.group({
				locationCtrl: ['', Validators.required],
				maxPlayerCtrl: ['', null]
			}),
			fourthFormGroup : this._formBuilder.group({
				endDateCtrl: ['', Validators.required]
			})
		})
	}

	get second(){
		return (this.formGroup.controls['secondFormGroup']as FormGroup).controls;
	  }
	
	get first() {
		return (this.formGroup.controls['firstFormGroup']as FormGroup).controls;
	}

	  onImageChange(e : any) {
		const reader = new FileReader();
		
		if(e.target.files && e.target.files.length) {
		  const [file] = e.target.files;
		  reader.readAsDataURL(file);
		
		  reader.onload = () => {
			this.imgFile = reader.result as string;
			(this.formGroup.controls['secondFormGroup']as FormGroup).patchValue({
			  imgSrc: reader.result
			});
	   
		  };
		}
	  }
	
	onClickSubmit(form : any) {
		console.log(form);
	}

	submit(stepper : MatStepper) {
		if (!this.formGroup.controls['firstFormGroup'].valid) {
			for (let i = 0; i < stepper.steps.length - 1; i++ ) {
				stepper.previous();

			}
			return;
		}
		else if (!this.formGroup.controls['secondFormGroup'].valid) {
			for (let i = 0; i < stepper.steps.length - 2; i++ ) {
				stepper.previous();

			}
			return;
		}
		else if (!this.formGroup.controls['secondFormGroup'].valid) {
			for (let i = 0; i < stepper.steps.length - 2; i++ ) {
				stepper.previous();

			}
			return;
		}
		else if (!this.formGroup.controls['secondFormGroup'].valid) {
			for (let i = 0; i < stepper.steps.length - 2; i++ ) {
				stepper.previous();

			}
			return;
		}
		else {
			var leagues = this.storage.getLeagues();
			if (leagues === undefined) {
				console.log("something went wrong, no league was saved on localstorage");
				return;
			}
			else {
				var id_ : string = "l" + leagues.length.toString();
				var new_league : League = {id : id_,
									  name : this.formGroup.controls['firstFormGroup'].value.nameCtrl,
									  city : this.formGroup.controls['thirdFormGroup'].value.locationCtrl,
									  max_players: this.formGroup.controls['thirdFormGroup'].value.maxPlayerCtrl,
									  admin_id: this.storage.getSelectedUser().UID,
									  picture_url: '/assets/images/users/1.jpg',
									  active: true,
									  end: new Date( this.formGroup.controls['fourthFormGroup'].value.end)}
				
				leagues.push(new_league);
				this.storage.saveLeague(leagues);

			}
			
		}


	}
}
