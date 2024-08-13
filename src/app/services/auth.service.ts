import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedDataService } from './shared-data.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient, private sharedDataService : SharedDataService) { }
  private _userData : any 

  get user(): any {
    return this._userData;
  }

  setUserData(userData: any) {
    this.sharedDataService.setUserId(userData.id);
  }

  get IsAuthenticated(){
    return this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  getUser(user: { email: string, password: string }): Observable<any> {
    console.log("USER FROM SERVICE", user);
    return this.http.post<any>(this.apiUrl, user);
  }

  getUserByEmailAndPassword(user: { email: string, password: string }): Promise<any> {
    return this.getUser(user).toPromise();
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const userData = await this.getUserByEmailAndPassword({ email, password });
      if (userData.email && userData.password) {
        this.isAuthenticated = true;
        this.setUserData(userData);
        this.sharedDataService.setUser(userData);
        this.sharedDataService.setAuth(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error during sign in', error);
      return false;
    }
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  createUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl + '/create', user, httpOptions);

  }
}
