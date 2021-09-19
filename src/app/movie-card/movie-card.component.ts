// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  favoritemovies: any[] = [];
  movies: any[] = [];

  /**
  * @param fetchApiData
  * @param dialog
  * @param snackBar
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  /**
  * This method runs on initialization and gets all movies so movie cards can be rendered
  */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
  * This method gets all movies
  */
  getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
  * This method will get's director data
  */
  getDirector(name: string,
    bio: string,
    birth: string,
    death: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        name: name,
        bio: bio,
        birth: birth.substr(0, 10),
        death: death.substr(0, 10)
      }
    });
  }

  /**
  * This method will get's genre data
  */
  getGenre(name: string,
    description: string,
  ): void {
    console.log(name)
    this.dialog.open(GenreComponent, {
      data: {
        name: name,
        description: description,
      }
    });
  }

  /**
  * This method will get's movie synopsis, director name, and genre name
  */
  getSynopsis(
    title: string,
    description: string,
    name: string,
    genre: string,
  ): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        title: title,
        description: description,
        director: name,
        genre: genre,
      }
    });
  }

  /**
  * This method gets status of wether current movie is in favorite movie area
  * @returns boolean of whether or not movie is in favorite movie area
  */
  currentFavorite(movieID: string) {
    return this.favoritemovies.includes(movieID);
  }

  /**
  * This method adds or removes movie from favorites.
  * @returns updated array or favorite movie list
  */
  addOrRemoveFavorite(movieId: string): any {
    if (this.currentFavorite(movieId)) {
      this.fetchApiData.deleteFavMovie(movieId).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favoritemovies.indexOf(movieId);
      return this.favoritemovies.splice(index, 1);
    } else {console.log(this.favoritemovies
      );
      
      this.fetchApiData.addToFavoriteMovies(movieId).subscribe((response: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });console.log(this.favoritemovies
          );
      });
    } console.log(this.favoritemovies
      );
    return this.favoritemovies.push(movieId);
  }
}

