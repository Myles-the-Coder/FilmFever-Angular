import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FetchApiDataService} from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {Username: '', Password: '', Email: '', Birthday: ''}
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(res => {
      const {token, user} = res
      this.dialogRef.close()
      localStorage.setItem('token', token)
      localStorage.setItem('user', user.Username)
      this.router.navigate(['movies'])
      this.snackBar.open(res, 'OK', {
        duration: 2000
      })
    },
    res => {
      this.snackBar.open(res, 'OK', {
        duration: 2000
      })
    }
    )
  }
}
