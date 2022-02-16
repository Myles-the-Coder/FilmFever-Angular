import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})

export class UserLoginFormComponent implements OnInit {
  @Input() userCredentials = {Username: '', Password: ''};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      res => {
        this.dialogRef.close();
        const {token, user} = res
        localStorage.setItem('token', token)
        localStorage.setItem('user', user.Username)
        this.router.navigate(['movies'])
        this.snackBar.open(res, 'OK', { duration: 2000 });
      },
      res => {
        this.snackBar.open(res, 'OK', { duration: 2000 });
      }
    );
  }
}
