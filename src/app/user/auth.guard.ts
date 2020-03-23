import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackService } from '../services/snack.service';
import { first } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { PreviousRouteService } from '../services/previous-route.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private snack: SnackService,
    private router: Router,
    private previousRouteService: PreviousRouteService
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    state: RouterStateSnapshot): Promise<boolean> {


    if (isPlatformBrowser) {
      const user = await this.afAuth.authState.pipe(first()).toPromise();
      // convert to boolean with !!
      const isLoggedIn = !!user;

      if (!isLoggedIn) {
        // save the route
        this.previousRouteService.setPreviousUrl(state.url);
        this.snack.authError();
        this.router.navigate(['/login']);
      }

      return isLoggedIn;
    } else {
      return false;
    }


  }

}
