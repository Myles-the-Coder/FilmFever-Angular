import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  filteredFavs: any[] = []
    constructor( 
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
      this.returnUser()
      setTimeout(() => {
        this.getFavoriteMovies()
      }, 1000);
    }
/**
 * This function fetches user information from API
 * @returns current user
 */
  returnUser(): void {
    const user = localStorage.getItem('user')
    this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
      this.currentUser = res
      return this.currentUser
    })
  }
/**
 * This function fetches all movies from API
 * The movies array is filtered to only show movies in the user's favorites list
 * These movies are pushed to the filteredFavs array
 * @returns favorite movies filtered from all movies
 */
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      res.forEach((movie: any) => {
        if (this.currentUser.FavoriteMovies.includes(movie._id)) {
          this.filteredFavs.push(movie)
        }
      })
      return this.filteredFavs
      });
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
