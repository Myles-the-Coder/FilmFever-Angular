import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((res: any) => {
      this.dialogRef.close();
      this.openUserLoginDialog(this.userData.Username);
      this.snackBar.open(
        `${this.userData.Username} registered successfully`,
        'OK',
        {duration: 2000}
      );
    }, res => {
      this.snackBar.open(res, 'OK', {duration: 2000})
    });
  }

  openUserLoginDialog(username: string): void {
    this.dialog.open(UserLoginFormComponent, {
      data: username,
      width: '500px',
    });
  }
}
