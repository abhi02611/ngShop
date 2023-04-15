import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngShop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  constructor(private route: Router) {}

  navigateHome() {
    this.route.navigate(['/']);
  }
}
