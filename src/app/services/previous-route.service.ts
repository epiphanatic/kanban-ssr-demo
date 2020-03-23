import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  public setPreviousUrl(url: string) {
    // console.log(url);
    sessionStorage.setItem('previousUrl', url);
  }

  public getPreviousUrl() {
    const previousUrl = sessionStorage.getItem('previousUrl');
    // console.log(previousUrl);
    return previousUrl;
  }

  public deletePreviousUrlKey() {
    sessionStorage.removeItem('previousUrl');
  }
}
