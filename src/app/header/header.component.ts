import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
  /**
   * This function removes the user's token and username from local storage and redirects them to the welcome screen
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
