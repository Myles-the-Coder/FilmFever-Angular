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
/**
 * This function registers a new account if information is valid
 * @param userDetails Username, Password, Email, Birthday
 * @returns Message
 */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}signup`, userDetails)
      .pipe(catchError(this.handleError));
  }
/**
 * This function logins in user if their information is in database
 * @param userDetails Username and Password
 * @returns Message
 */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }
/**
 * This is an error handling function
 * @param err 
 * @returns Error message
 */
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
/**
 * This function fetches all movies from API
 * @returns All movies from API
 */
  getAllMovies(): Observable<any> {
    return this.http
      .get(`${apiUrl}movies`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
/**
 * This function fetches information about a single movie by ID
 * @param movieId 
 * @returns Movie information
 */
  getSingleMovie(movieId: string): Observable<any> {
    return this.http
      .get(`${apiUrl}movies/${movieId}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
/**
 * This function fetches director information from API
 * @param name Director's name
 * @returns Director information
 */
  getDirector(name: string): Observable<any> {
    return this.http
      .get(`${apiUrl}directors/${name}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
/**
 * This function fetches genre information from API
 * @param name Genre name
 * @returns Genre information
 */
  getGenre(name: string): Observable<any> {
    return this.http
      .get(`${apiUrl}genres/${name}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
/**
 * This function returns user's favorite movies IDs array
 * @param user Username
 * @returns Favorite movies IDs array
 */
  getFavoriteMovies(user: string | null): Observable<any> {
    return this.http
      .get(`${apiUrl}users/${user}/movies`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
/**
 * This function adds movie ID to user's favorite movies array
 * @param id Movie's ID
 * @param user Username
 * @returns Message
 */
  addToFavoriteMovies(id: string, user: string | null): Observable<any> {
    return this.http
      .post(`${apiUrl}users/${user}/movies/${id}`, id, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
/**
 * This function removes movie ID from user's favorite movies array
 * @param id Movie's ID
 * @param user Username
 * @returns Message
 */
  deleteFromFavoritesList(id: string, user: string | null): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${user}/movies/${id}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
/**
 * This function fetches user information from API
 * @param user Username
 * @returns User information
 */
  getUserProfile(user: string | null): Observable<any> {
    return this.http
      .get(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
/**
 * This function updates user information
 * @param user Username
 * @param userData Username, Password, Email, Birthday
 * @returns Message
 */
  editUserProfile(user: string | null, userData: object): Observable<any> {
    return this.http
      .put(`${apiUrl}users/update/${user}`, userData, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
/**
 * This function deletes user account from database
 * @param user Username
 * @returns Message
 */
  deleteUserProfile(user: string | null): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * This function extracts response data from ?HTTP request
   * @param data JSON
   * @returns Response data from HTTP request
   */
  private extractResponseData(data: any | Object): any {
    return data || {};
  }
}
