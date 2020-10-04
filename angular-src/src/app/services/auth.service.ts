import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {
              headers: headers,
              observe:'response'
            }).pipe(map((res:HttpResponse<JSON>)=>res));
  }

  getProfile() {
    this.loadToken();

    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });

    return this.http.get('http://localhost:3000/users/profile',{
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

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    this.loadToken();
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
