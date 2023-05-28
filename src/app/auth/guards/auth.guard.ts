import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {
  constructor( 
    private authService: AuthService,
    private router: Router
    ) {}

  private checkAuthStatus(): Observable<boolean> | boolean {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if ( !isAuthenticated ) this.router.navigate(['./auth/login'])
        })
      )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>| boolean {
      // console.log('Can Activate');
      // console.log({route, state});
      
      return this.checkAuthStatus();
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean>| boolean {
      // console.log('Can Match');
      // console.log({route, segments});
      
      return this.checkAuthStatus();
  }
}
