import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})



export class AccountUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birth: '' };

  user: any = {};
  movies: any = [];
  favorites: any = [];

  /**
   * 
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   */
  constructor(public fetchApiData:FetchApiDataService,    public dialogRef: MatDialogRef<AccountUpdateComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  /**
   * This method will will send inputed data to update user's account in database
   */
  editUser(): void {
    this.fetchApiData.editUserData(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      console.log(resp);
      localStorage.setItem('user', resp.Username);
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000
      });
    }, (res) => {
      console.log(res);
      this.snackBar.open(res, 'OK', {
        duration: 2000
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

}