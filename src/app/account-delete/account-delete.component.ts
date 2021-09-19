import { Component, OnInit,Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birth: '', _id:'', };

  username: any = {};
  /**
   * 
   * @param fetchApiData 
   * @param snackBar 
   * @param router 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * This method runs on initialization to get the user's name
   */
  ngOnInit(): void {
    this.getUserName()
  }

  
  /**
   * This method gets the user's name
   */
  getUserName(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.userData = resp;
      this.username = this.userData.Username
      console.log('this is the user id type ' + this.username )
    })
  }

  /**
   * This method deletes user account
   */
  deleteUserAccount(): void {
    this.fetchApiData.deleteUser(this.username).subscribe(
      (resp: any) => {
        this.snackBar.open(
          'Your account has successfully been deleted!',
          'OK',
          {
            duration: 4000,
          }
        );
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 4000,
        });
        this.router.navigate(['/welcome']).then(() => {
          localStorage.clear();
          window.location.reload();
        });
      }
    );
  }

 /**
   * This method cancels deletion of account
   */
  cancel(): void {
    this.router.navigate(['/account']).then(() => {
      window.location.reload();
    });
  }
}
