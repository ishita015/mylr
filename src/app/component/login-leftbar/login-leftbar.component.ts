import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-leftbar',
  templateUrl: './login-leftbar.component.html',
  styleUrls: ['./login-leftbar.component.css']
})
export class LoginLeftbarComponent implements OnInit {
  cookieValue:any;
  transporter_detail:any;
  constructor(private router:Router,private cookieService:CookieService) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
     this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
   
     this.transporter_detail=this.cookieValue;
    }
    else{
     this.router.navigate(['/login']);
    }
  }

}
