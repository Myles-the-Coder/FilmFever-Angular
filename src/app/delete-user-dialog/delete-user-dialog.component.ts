import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteAccount(): void {
    const user = localStorage.getItem('user')
    this.fetchApiData.deleteUserProfile(user).subscribe((res: any) => {
      this.snackBar.open('Your account has been deleted', 'OK', {
        duration: 2000
      })
    })
    this.dialogRef.close()
     localStorage.clear()
     this.router.navigate(['/'])
  }

  closeDialog(): void {this.dialogRef.close()}
}
