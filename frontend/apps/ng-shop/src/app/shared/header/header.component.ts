import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService, UsersService } from '@frontend/user';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../../../libs/user/src/lib/services/auth.service';

@Component({
  selector: 'ngShop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userloggedIn = false;
  loggedUserName = '';
  userNameInitials = '';
  items: MenuItem[];
  logInItems: MenuItem[];

  constructor(
    private route: Router,
    private usersService: UsersService,
    private authService: AuthService,
    private localStorageToken: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'LogOut',
        command: () => this.logout(),
      },
    ];

    this.logInItems = [
      {
        label: 'LogIn',
        command: () => this.login(),
      },
      {
        label: 'Register',
        command: () => this.register(),
      },
    ];

    this.authService.user$.subscribe(user => {
        if(user) {
           this.userloggedIn = true;
           this.loggedUserName = user.name;
                       this.loggedUserName = user.name;
                       const userArra = this.loggedUserName.split(' ');

                       if (userArra.length == 1) {
                         this.userNameInitials = userArra[0].substring(0, 1);
                       }
                       if (userArra.length == 2) {
                         this.userNameInitials =
                           userArra[0].substring(0, 1) +
                           userArra[1].substring(0, 1);
                       }
        }
    })

    const token = this.localStorageToken.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (!this._tokenExpired(tokenDecode.exp)) {
        this.userloggedIn = true;
        this.usersService.observeCurrentUser().subscribe((user: any) => {
          console.log(user);
          if (user) {
            this.loggedUserName = user.name;
            const userArra = this.loggedUserName.split(' ');

            if (userArra.length == 1) {
              this.userNameInitials = userArra[0].substring(0, 1);
            }
            if (userArra.length == 2) {
              this.userNameInitials =
                userArra[0].substring(0, 1) + userArra[1].substring(0, 1);
            }
          }
        });
      }
    } else {
      this.userloggedIn = false;
      this.loggedUserName = '';
    }
  }

  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  logout() {
    this.localStorageToken.removeToken();
    this.userloggedIn = false;
    this.loggedUserName = '';
    this.userNameInitials = '';
    this.route.navigate(['/']);
  }

  login() {
    this.route.navigate(['/login']);
  }

  register() {
     this.route.navigate(['/register']);
  }

  navigateHome() {
    this.route.navigate(['/']);
  }
}
