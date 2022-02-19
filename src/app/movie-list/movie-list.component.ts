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
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
      this.currentUser = res;
      this.favoriteMovies = res.FavoriteMovies;
      return this.currentUser, this.favoriteMovies;
    });
  }

  getMovieGenre(genre: string): void {
    this.fetchApiData.getGenre(genre).subscribe((res: any) => {
      const { Name, Description } = res;
      this.dialog.open(GenrePageComponent, {
        data: { Name, Description },
        width: '500px',
      });
    });
  }

  getMovieDirector(director: string): void {
    this.fetchApiData.getDirector(director).subscribe((res: any) => {
      const { Name, Bio, Birthdate } = res;
      this.dialog.open(DirectorPageComponent, {
        data: { Name, Bio, Birthdate, Deathdate: res?.Deathdate },
        width: '500px',
      });
    });
  }

  getMovieSynopsis(id: string): void {
    this.fetchApiData.getSingleMovie(id).subscribe((res: any) => {
      const { Title, Description } = res;
      this.dialog.open(SynopsisPageComponent, {
        data: { Title, Description },
        width: '500px',
      });
    });
  }

  toggleFavoriteMovies(id: string, movieTitle: string) {
    const isInFavorites =
      this.favoriteMovies.filter((e: any) => e === id).length > 0;
    isInFavorites
      ? this.removeFromFavorites(id, movieTitle)
      : this.addToFavorites(id, movieTitle);
  }

  addToFavorites(id: string, movieTitle: string): void {
    this.fetchApiData
      .addToFavoriteMovies(id, this.currentUser.Username)
      .subscribe((res: any) => {
        this.getCurrentUser();
        this.snackBar.open(`${movieTitle} added to favorites`, 'OK', {
          duration: 2000,
        });
        this.isInFavorites = true;
      });
  }

  removeFromFavorites(id: string, movieTitle: string) {
    this.fetchApiData
      .deleteFromFavoritesList(id, this.currentUser.Username)
      .subscribe((res: any) => {
        this.getCurrentUser();
        this.snackBar.open(`${movieTitle} removed from favorites`, 'OK', {
          duration: 2000,
        });
        this.isInFavorites = false;
      });
  }

  favCheck(id: string) {
    if (this.favoriteMovies.includes(id)) {
      this.isInFavorites = true;
      return this.isInFavorites;
    }
    return;
  }
}
