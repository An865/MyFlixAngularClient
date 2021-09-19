import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  /**
   * 
   * @param snackBar
   * @param router
   */
  constructor(
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Navigates to account page.
   */
  toAccount(): void {
    this.router.navigate(['account'])
  }

  /**
   * logs out current user
   */
  logOutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('log out successful', 'OK', {
      duration: 2000
    });
  }
}
