import { Component, Input, Output } from '@angular/core';
import { SignInComponent } from "../sign-in/sign-in.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SignInComponent,
    CommonModule,
  ],
  providers: [
    AuthService,
    Router
  ],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output() hideSignInForm = false;
  signInbutton : string = "Connexion"
  isAuthenticated : any

  constructor(private sharedService : SharedDataService, private router: Router){}

  signInClicked(){
    this.hideSignInForm = true
  }

  exitForm(){
    this.hideSignInForm = false;
  }

  getAuth() {
    console.log('User ID FINAL 11:');
    this.sharedService.isAuth$.subscribe(auth => {
      if (auth) {
        this.isAuthenticated = auth
        console.log('AUTH IS:', auth);
      } else {
      }
    });
  }

logout() {
    this.router.navigateByUrl('/login');
    console.log("IS AUTHENTICATED", this.isAuthenticated);
  }

}
