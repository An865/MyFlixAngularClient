import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';
//import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { AccountDeleteComponent } from '../account-delete/account-delete.component';
import { AccountUpdateComponent } from '../account-update/account-update.component';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})

export class UserAccountComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birth: '' };
  user: any = {};
  movies: any = [];
  favorites: any = [];

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getUser();
  }

  //function to get user data
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.userData = resp;
      this.user=resp;
      this.userData.Birth = resp.Birth.substr(0, 10);
      this.getMovies();
    })
  }

  //function to get all of the movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  //filter all movies to just favorites, for every movie if its' id is included in favorites then add it to fav movie array
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    console.log(this.favorites);
    return this.favorites;
  }

  deleteFavMovie(id: string): void {
    this.fetchApiData.deleteFavMovie(id).subscribe((resp: any) => {
      this.snackBar.open('Movie Deleted!', 'OK', {
        duration: 2000,
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }


  editUserData(): void {
    this.dialog.open(AccountUpdateComponent, {
      width: '350px'
    });
  }
 
  deleteUserData(): void {
    this.dialog.open(AccountDeleteComponent, {
      width: '350px'
    });
  }
}
