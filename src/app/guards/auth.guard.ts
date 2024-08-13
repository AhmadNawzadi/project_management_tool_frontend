// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
// import { UserService } from '../services/user.service'; 
// import { AuthService } from '../services/auth.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) { }

//   // canActivate(
//   //   next: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot): boolean {
//   //   if (this.authService.isLoggedIn()) {
//   //     return true;
//   //   } else {
//   //     this.router.navigate(['/login']);
//   //     return false;
//   //   }
//   // }

// //   canActivate(
// //     next: ActivatedRouteSnapshot,
// //     state: RouterStateSnapshot):   
// //  Observable<boolean | UrlTree> {
// //     return this.authService.isLoggedIn().pipe(
// //       take(1),
// //       map(isLoggedIn => {
// //         if (isLoggedIn) {
// //           return true;
// //         } else {
// //           this.router.navigate(['/login']);   

// //           return false;
// //         }
// //       })
// //     );
// //   }
// }
