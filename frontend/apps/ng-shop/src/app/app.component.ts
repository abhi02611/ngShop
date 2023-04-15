import { Component, OnInit } from '@angular/core';
import { UsersService } from '@frontend/user';

@Component({
  selector: 'ngShop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UsersService) {}

  title = 'ngshop';

  ngOnInit() {
    this.userService.initAppSession();
  }
}
