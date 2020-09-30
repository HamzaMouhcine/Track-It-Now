import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  registerUser(user){
  	let headers = new HttpHeaders();
  	headers.append('content-Type','application/json');
  	return this.http.post('http://localhost:3000/users/register', user, {
  					  headers: headers,
  					  observe:'response'
  					}).pipe(map((res:HttpResponse<JSON>)=>res));
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {
              headers: headers,
              observe:'response'
            }).pipe(map((res:HttpResponse<JSON>)=>res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
