import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data-service/data-service';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UpdateInfoFormComponent } from '../update-info-form/update-info-form.component';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  currentUser: any = {};
  constructor(private dataService: DataService, 
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user')
    this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
      this.currentUser = res
    })
  }

  openUpdateDialog(): void {
    this.dialog.open(UpdateInfoFormComponent, {
      width: '500px',
    });
  }

  openDeleteDialog(): void {
    this.dialog.open(DeleteUserDialogComponent, {
      width: '500px',
    });
  }
}
