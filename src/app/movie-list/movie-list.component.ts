import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenrePageComponent } from '../genre-page/genre-page.component';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { SynopsisPageComponent } from '../synopsis-page/synopsis-page.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})

export class MovieListComponent implements OnInit {
  @Input() movies: any[] | undefined 
  currentUser: any = null;
  favoriteMovies: any = [];
  isInFavorites: boolean = false;
  userAccess = localStorage.getItem('user');
  userToken = localStorage.getItem('token')
  width = '500px'
  duration = 2000
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userToken && this.getCurrentUser()
  }
/**
 * This function gets the current user's information and sets this response to the currentUser variable
 */
  getCurrentUser(): void {
    this.fetchApiData.getUserProfile(this.userAccess).subscribe((res: any) => {
      this.currentUser = res;
      this.favoriteMovies = res.FavoriteMovies;
      return this.currentUser, this.favoriteMovies;
    });
  }
/**
 * This function opens the genre page dialog with information about the movie's genre
 * @param genre Genre name
 */
  getMovieGenre(genre: string): void {
    this.fetchApiData.getGenre(genre).subscribe((res: any) => {
      const { Name, Description } = res;
      this.dialog.open(GenrePageComponent, {
        data: { Name, Description },
        width: this.width,
      });
    });
  }
/**
 * This function opens the director page dialog with information about the movie's director
 * @param director Director name
 */
  getMovieDirector(director: string): void {
    this.fetchApiData.getDirector(director).subscribe((res: any) => {
      const { Name, Bio, Birthdate } = res;
      this.dialog.open(DirectorPageComponent, {
        data: { Name, Bio, Birthdate, Deathdate: res?.Deathdate },
        width: this.width,
      });
    });
  }
/**
 * This function opens the movie synopsis page dialog with the movie's synopsis
 * @param id Movie ID
 */
  getMovieSynopsis(id: string): void {
    this.fetchApiData.getSingleMovie(id).subscribe((res: any) => {
      const { Title, Description } = res;
      this.dialog.open(SynopsisPageComponent, {
        data: { Title, Description },
        width: this.width,
      });
    });
  }
/**
 * Adds movie to user's favorite list if it is not already, else remove it
 * @param id Movie ID
 * @param movieTitle 
 */
  toggleFavoriteMovies(id: string, movieTitle: string) {
    const isInFavorites =
      this.favoriteMovies.filter((e: any) => e === id).length > 0;
    isInFavorites
      ? this.removeFromFavorites(id, movieTitle)
      : this.addToFavorites(id, movieTitle);
  }
/**
 * This function adds a movie to the user's favorites list
 * @param id Movie ID
 * @param movieTitle 
 */
  addToFavorites(id: string, movieTitle: string): void {
    this.fetchApiData
      .addToFavoriteMovies(id, this.currentUser.Username)
      .subscribe((res: any) => {
        this.getCurrentUser();
        this.snackBar.open(`${movieTitle} added to favorites`, 'OK', {
          duration: this.duration,
        });
        this.isInFavorites = true;
      });
  }
/**
 * This function removes a movie from the user's favorites list
 * @param id Movie ID
 * @param movieTitle 
 */
  removeFromFavorites(id: string, movieTitle: string) {
    this.fetchApiData
      .deleteFromFavoritesList(id, this.currentUser.Username)
      .subscribe((res: any) => {
        this.getCurrentUser();
        this.snackBar.open(`${movieTitle} removed from favorites`, 'OK', {
          duration: this.duration,
        });
        this.isInFavorites = false;
      });
  }
/**
 * This function sets 'isInFavorites' variable to true if movie ID is in user's favorites list
 * @param id Movie ID
 * @returns boolean value
 */
  favCheck(id: string) {
    if (this.favoriteMovies.includes(id)) {
      this.isInFavorites = true;
      return this.isInFavorites;
    }
    return;
  }
}
