import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userCredentials = {Username: '', Password: ''};
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      res => {
        this.dialogRef.close();
        const {token, user} = res
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        this.snackBar.open(res, 'OK', { duration: 2000 });
      },
      res => {
        this.snackBar.open(res, 'OK', { duration: 2000 });
      }
    );
  }
}
