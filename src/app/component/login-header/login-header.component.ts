import { Component, OnInit } from '@angular/core';
// import { CarouselModule } from 'angular4-carousel';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent implements OnInit {

  public isShowHead:any;
  cookieValue: any;
  check:any;
  isShow;
  constructor(private router:Router,private cookieService:CookieService) {
    this.isShowHead=false;
    console.log(this.isShowHead)
    router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        if(this.cookieService.get('loginData') !=undefined && this.cookieService.get('loginData')!='')
    {
      console.log(this.cookieValue)
    this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
      console.log(this.cookieValue.response);
      if(this.cookieValue)
      {
        this.isShowHead=true;
      }
      else
      {
        this.isShowHead=false;
      }
   }
      }})
    
  }
   logout()
   {
    this.cookieService.delete('loginData','/mylr-web/');
    console.log(this.cookieValue)
    this.router.navigate(['home']);
    location.reload();

   }
  ngOnInit() {
    
  }
}
