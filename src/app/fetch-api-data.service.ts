import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const apiUrl = environment.apiUrl;
const token = localStorage.getItem('token');

@Injectable({ providedIn: 'root' })
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}signup`, userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): any {
    const { error } = err;
    const { message, status } = error;
    if (error instanceof ErrorEvent) {
      console.error('Some error occurred:', message);
    } else {
      console.error(`Error Status code ${status}, Error body is: ${error}`);
      return throwError(
        () => new Error('Something went wrong, please try again later')
      );
    }
  }

  getAllMovies(): Observable<any> {
    return this.http
      .get(`${apiUrl}movies`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getSingleMovie(movieId: string): Observable<any> {
    return this.http
      .get(`${apiUrl}movies/${movieId}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getDirector(name: string): Observable<any> {
    return this.http
      .get(`${apiUrl}directors/${name}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getGenre(name: string): Observable<any> {
    return this.http
      .get(`${apiUrl}genres/${name}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getFavoriteMovies(user: string | null): Observable<any> {
    return this.http
      .get(`${apiUrl}users/${user}/movies`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  addToFavoriteMovies(id: string, user: string | null): Observable<any> {
    return this.http
      .post(`${apiUrl}users/${user}/movies/${id}`, id, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  deleteFromFavoritesList(id: string, user: string | null): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${user}/movies/${id}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getUserProfile(user: string | null): Observable<any> {
    return this.http
      .get(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  editUserProfile(user: string | null, userData: object): Observable<any> {
    return this.http
      .put(`${apiUrl}users/update/${user}`, userData, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  deleteUserProfile(user: string | null): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(data: any | Object): any {
    return data || {};
  }
}
