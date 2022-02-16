import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data-service/data-service';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-update-info-form',
  templateUrl: './update-info-form.component.html',
  styleUrls: ['./update-info-form.component.scss']
})
export class UpdateInfoFormComponent implements OnInit {
  username = localStorage.getItem('user')
  user: any = {}
  @Input() userData = {Username: '', Password: '', Email: '', Birthday: ''}
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dataService: DataService,
    public dialogRef: MatDialogRef<UpdateInfoFormComponent>
  ) { }

  ngOnInit(): void {
    this.fetchApiData.getUserProfile(this.user).subscribe((res: any) => {
      this.user = res
    })
  }

  updateUser(): void {
    this.fetchApiData.editUserProfile(this.username, this.userData).subscribe((res: any) => {
      this.dialogRef.close()
      localStorage.setItem('user', res.Username);
      this.snackBar.open('Your profile was updated successfully', 'OK', {
        duration: 3000
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    })
  }
}
