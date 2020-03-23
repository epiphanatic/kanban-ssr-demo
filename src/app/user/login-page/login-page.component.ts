import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PreviousRouteService } from '../../services/previous-route.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  public loggedIn: boolean;
  public user: firebase.User;
  private userSub: Subscription;
  public isBrowser = isPlatformBrowser;
  public isLoggingIn = false;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private previousRouteService: PreviousRouteService,
  ) {
    if (isPlatformBrowser) {
      this.userSub = this.afAuth.authState.subscribe((user: firebase.User) => {
        this.loggedIn = !!user;
        this.user = user;
        const previousRoute = this.previousRouteService.getPreviousUrl();
        if (previousRoute && this.loggedIn) {
          this.router.navigate([previousRoute]).then(() => {
            this.previousRouteService.deletePreviousUrlKey();
          });
        }
      });
    }

  }

  ngOnInit() {
    // console.log('login init');
  }

  ngOnDestroy() {
    if (this.userSub) { this.userSub.unsubscribe(); }
  }

  googleLogin() {
    this.isLoggingIn = true;
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

}
