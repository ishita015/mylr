import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cookieValue: any;
  public display='none';
  public display2='none';
  constructor(public router: Router, private cookieService: CookieService) {
  router.events.forEach((event: NavigationEvent) => {
    //   if (event instanceof NavigationStart) {
    //     // if (this.cookieService.get('loginData') !== '' && this.cookieService.get('loginData') !== undefined) {
    //     //   // this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
    //     //   this.cookieValue = this.cookieService.get('loginData');
    //     //   console.log(this.cookieValue);
    //     // }
    //     console.log(this.cookieValue);
    //   //   if (this.cookieValue === '' || this.cookieValue === undefined) {
    //   //     if (event.url === '/') {
    //   //     }else {
    //   //       this.router.navigate(['/']);
    //   //     }
    //   //  }
    // }
  });
}
openModal(){
  this.display2="block";
  }

  
}
