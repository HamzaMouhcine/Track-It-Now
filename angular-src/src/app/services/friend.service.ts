import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
	user: object;

	constructor(private http:HttpClient) { }

	sendRequest(userToAdd) {
		if (localStorage.getItem('user') === null) {
			return { body: {
					success: false,
					msg: "Login session expired, Please refresh."
				}
			} as any;
		}
		this.user = JSON.parse(localStorage.getItem('user'));
		const user = {
			username: userToAdd.username
		}

		let headers = new HttpHeaders();
	    headers.append('Content-Type','application/json');
	    return this.http.post('http://localhost:3000/friends/add', 
	    		{
	    			'addme':this.user,
	    			'to':user
	    		},
	    		{
	            	headers: headers,
	            	observe:'response'
	            }).pipe(map((res:HttpResponse<JSON>)=>res));
	}
}
