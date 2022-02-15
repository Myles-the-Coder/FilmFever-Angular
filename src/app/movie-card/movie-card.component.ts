import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenrePageComponent } from '../genre-page/genre-page.component';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { SynopsisPageComponent } from '../synopsis-page/synopsis-page.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  currentUser: any = null
    constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser()
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      console.log(res)
      this.movies = res;
      return this.movies;
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
      const {Title, Description} = res
      this.dialog.open(SynopsisPageComponent, {
        data: { Title ,Description },
        width: '500px',
      });
    })
  }

  getCurrentUser(): void {
    this.fetchApiData.getUserProfile().subscribe((res: any) => {
      console.log(res)
      this.currentUser = res
      return this.currentUser
    })
  }

  addToFavorites(id: string): void {
    this.fetchApiData.addToFavoriteMovies(id).subscribe((res: any) => {
      this.getCurrentUser()
    });
  }
}
