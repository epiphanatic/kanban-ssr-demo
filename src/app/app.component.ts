import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { isPlatformBrowser } from '@angular/common';
import { PreviousRouteService } from './services/previous-route.service';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portobello';
  loggedIn: boolean;
  user: firebase.User;
  userSub: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      // because subscribing multiple times in template so want to make sure
      //  everything is listening to the same value at the same time
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public afAuth: AngularFireAuth,
    // go ahead and initiate the previous route service by instantiating service here
    private previousRouteService: PreviousRouteService,
    public seo: SeoService
  ) {
    if (isPlatformBrowser) {
      this.userSub = this.afAuth.authState.subscribe((user: firebase.User) => {
        this.loggedIn = !!user;
        this.user = user;
      });
    }
  }
  // constructor(private breakpointObserver: BreakpointObserver) { }
}
