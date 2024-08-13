import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared-data.service';
import { User } from '../models/user';



@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    Router,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit{

  @Output() exit = new EventEmitter();

  constructor(
    private authService : AuthService, 
    private router: Router,
    ){}

  useruser : number | null = null

  ngOnInit(): void {
  }

  hideSignUpForm : boolean = false
  signUpClicked : boolean = false;
  isSignUpTextHidden : boolean = false;
  hideSignUp  : boolean = false;
  hideSignIn  : boolean = true;
  isAuthenticated : boolean = false;

  email : string = ""
  password : string = ""
  username : string = ""

  existingEmail : string = ""
  existingPassword : string = ""

  async onSubmit() {
    const isAuthenticated = await this.authService.signIn(this.email, this.password);
    if (isAuthenticated) {
      this.router.navigate(['/projects']);
      this.exitSignIn()
    } else {
      alert('Email ou mot de passe incorrect!');
    }
  }

  openSignUp(){
    this.hideSignIn = false;
    this.hideSignUp = true
  }

  exitSignIn() {
    this.exit.emit();
  }

  createUser(user: User) {
    this.authService.createUser(user).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.exitSignIn()
        alert("Compte créé avec succès.")
      },
      (error) => {
        alert("utilisateur deja exist.")
        console.error('Error creating user:', error);
      }
    );
  }


}
