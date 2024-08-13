import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$: Observable<number | null> = this.userIdSubject.asObservable();

  private userSubject = new BehaviorSubject<any>(null);   
  user$: Observable<any> = this.userSubject.asObservable();

  private isAuthSubject = new BehaviorSubject<boolean | null>(null);   
  isAuth$: Observable<boolean | null> = this.isAuthSubject.asObservable();

  private projectIdSubject = new BehaviorSubject<number | null>(null);
  projectId$ : Observable<number | null> = this.projectIdSubject.asObservable();

  constructor(){}

  setUserId(userId: number | null) {
    this.userIdSubject.next(userId);
  }
  setUser(user: any) {
    this.userSubject.next(user);
  }
  setAuth(isAuth: boolean | null) {
    this.isAuthSubject.next(isAuth);
  }
  setProjectId(projectId: number | null)  {
    this.projectIdSubject.next(projectId);
  }


}
