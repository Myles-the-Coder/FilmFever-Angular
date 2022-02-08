import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, map  } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const apiUrl = environment.apiUrl
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

@Injectable({providedIn: 'root'})
export class UserRegistrationService {

  constructor(private http: HttpClient) { }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http.post(apiUrl + 'signup', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse): any {
    const {error} = err
    const {message, status} = error
    if (error instanceof ErrorEvent) {
      console.error('Some error occurred:', message)
    } else {
      console.error(
        `Error Status code ${status},` + `Error body is: ${error}`
      )
      return throwError(() => new Error('Something went wrong, please try again later'))
    }
  }

  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getSingleMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/:MovieId', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirector(): Observable<any> {
    return this.http.get(apiUrl + 'directors/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getFavoriteMovies(): Observable<any> {
    return this.http.get(apiUrl + `users/${user}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addToFavoriteMovies(id: string): Observable<any> {
    return this.http.post(apiUrl + `users/${user}/movies/${id}`,null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteFromFavoritesList(id: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${user}/movies/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUserProfile(): Observable<any> {
    return this.http.get(apiUrl + `users/${user}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  editUserProfile(userData: object): Observable<any> {
    return this.http.put(apiUrl + `user/update/${user}`, userData,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteUserProfile(): Observable<any> {
    return this.http.delete(apiUrl + `users/${user}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(data: any | Object): any {
    return data || { }
  }
}
