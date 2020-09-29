import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	name: String;
	username: String;
	email: String;
	password: String;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
  	const user = {
  		name: this.name,
  		username: this.username,
  		email: this.email,
  		password: this.password
  	}

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass:'alert-danger', timeout:5000});
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter a valid email', {cssClass:'alert-danger', timeout:5000});
      return false;
    }
  }

}
