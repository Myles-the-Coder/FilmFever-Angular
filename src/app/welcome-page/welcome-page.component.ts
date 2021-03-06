import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor( public dialog: MatDialog, public router: Router) { }

  /**
   * Navigates to 'movies' page if user credentials are saved in local storage
   */
  ngOnInit(): void {
    const userAccess = localStorage.getItem('user')
    const userToken = localStorage.getItem('token')
    if (userAccess && userToken) {
      this.router.navigate(['movies'])
    } else {
      return
    }
  }
  /**
   * Opens Registration form
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '500px'
    })
  }
    /**
   * Opens Login form
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '500px'
    })
  }

}
