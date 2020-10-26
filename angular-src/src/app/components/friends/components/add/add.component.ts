import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../../../services/friend.service';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  username:string;

  constructor(
  		private friendService: FriendService,
  		private flashMessage: FlashMessagesService
  	) { }

  ngOnInit(): void {
  }

  OnSendRequestSubmit() {
  	const user = {
  		username: this.username
  	}

  	this.friendService.sendRequest(user).subscribe(data => {
  		if ((data as any).body.success) {
  			this.flashMessage.show((data as any).body.msg, {
  				cssClass:'alert-success', 
  				timeout: 5000});
  		} else {
  			this.flashMessage.show((data as any).body.msg, {
  				cssClass:'alert-warning', 
  				timeout: 5000});
  		}
  	});
  }

}
  	// <>
