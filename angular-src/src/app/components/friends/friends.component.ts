import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(
  	private route: ActivatedRoute,
  	private router: Router
  	) { }

  ngOnInit(): void {
  }

  showAdd() {
  	this.router.navigate(['add'], {relativeTo: this.route});
  }

  showList() {
  	this.router.navigate(['list'], {relativeTo: this.route});
  }
}
