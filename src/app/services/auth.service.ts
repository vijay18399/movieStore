import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://movies-store-api.herokuapp.com/auth/';
  // url = 'http://localhost:3000/auth/';
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.url + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      this.url + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }
  refreshToken(token: string) {
    return this.http.post(
      this.url + 'refreshtoken',
      {
        refreshToken: token,
      },
      httpOptions
    );
  }
  getUserCount() {
    return this.http.get(`${this.url}/user-count`);
  }
  getUsers(page: number, perPage = 8) {
    return this.http.get(`${this.url}/users?page=${page}&perPage=${perPage}`);
  }
  updateUser(data: any) {
    return this.http.post(this.url + 'update', data);
  }
}
