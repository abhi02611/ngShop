import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURLUsers = 'http://localhost:3000/api/v1/' + 'users';
  userSubject = new BehaviorSubject<User>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`, {
      email,
      password,
    });
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }

  updateUserStatus(user: User) {
     this.userSubject.next(user);
  }
}
