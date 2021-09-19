//core angular modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

//rxjs modules
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';


//url to retrieve data from myflix API
const apiUrl = 'https://spiremyflix.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {

  /**
   *
   * @param http
   * @param router
   */
  //dependency injection for HttpClient and Router
  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * User Registration Endpoint
   * @param userDetails
   * @returns new user as object
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * User Login Endpoint
   * @param userDetails
   * @returns logged in user as object
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
    .pipe(
      catchError(this.handleError)
    );
  }  

  /**
   * Get all movies
   * @returns all movies as object
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get One Movie by Movie Name
   * @returns movie as object
   */
  public getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:movieName', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  /**
   * Get Movie's Director by Movie Name
   * @returns director as object
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:movieName/director', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer '+ token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Get Movie's Genre by Movie Name
   * @returns genre as object
   */ 
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:movieName/genre', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Get User Data by Username
   * @params username
   * @returns user as object
   */ 
  getUser(username:any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    ) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  } 

   /**
   * Get User's Favorite Movies by Username
   * @params username
   * @returns user as object
   */ 
  getFavoriteMovies(username:any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `user/${username}/favorites`,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Add favorite movie to favorite movie list
   * @params moviesid
   * @returns user as object including favorite movies data
   */ 
  addToFavoriteMovies(moviesid:string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    console.log('this is the username: '+username)
    console.log(token, 'token from addToFavoriteMovies POST request')
    return this.http.put(apiUrl + `users/${username}/movies/${moviesid}`, null,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Edits Use's Data
   * @params userData
   * @returns updated user as object
   */ 
  editUserData(userData:any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, userData,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token, 
      }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  /**
   * Delete user's account
   * @params username
   * @returns string with confirmation of deletion
   */ 
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Delete Movie from Favorite Movie List
   * @params moviesid
   * @returns user as object including updated favorite movies list
   */ 
  deleteFavMovie(moviesid:string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    return this.http.delete(apiUrl + `users/${username}/${moviesid}`,
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Non-Typed Response Extraction
  private extractResponseData(response: Response|Object): any {
    const body = response;
    return body || {};
  }
  
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
