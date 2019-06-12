import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NavigationStart, Event as NavigationEvent } from '@angular/router';
import { HomeComponent } from './../../pages/home/home.component';
import {MylrService} from '../../mylr.service';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { lrRequest } from './../../pages/models/lr-request';
import { verifyOtp } from './../../pages/models/verify-otp';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isShow:boolean;
  cookieValue: any;
  check:any;
  status:any;
  public display='none';
  public display2='none';
  // public display2='none';
  public display3='none';
  public display5='none';
  public display4= 'none';
  public isStatus='true';
  public testArray:any;
  public isTempalteSelected=false;
  submitted;
  submitted2;
  isValidFormSubmitted = null;
  message;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  public imageLoader:boolean;
  public resultantArray1: lrRequest;
  public resultantArray2: verifyOtp;
  req_id;
  // public request_id: any={};
  lrForm = new FormGroup({
    transporter_contact_number : new FormControl(""),
    user_name:new FormControl(""),
    // [Validators.required, Validators.maxLength(50), Validators.pattern(/^((?!\s{2,}).)*$/)]
    user_contact_number:new FormControl(""),
    user_purpose:new FormControl(""),
});
verifyOtpForm = new FormGroup({
  request_id:new FormControl(""),
  transporter_otp:new FormControl(""),
  user_otp:new FormControl(""),
  // request_id: any;
  // transporter_otp:any;
  // user_otp:  any;
});
  constructor(private apiSerivce: MylrService,private router:Router,private cookieService:CookieService) {
    
    router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        if(this.cookieService.get('loginData') !=undefined && this.cookieService.get('loginData')!='')
          {
            this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
            if(this.cookieValue != '' || this.cookieValue != undefined)
            {
              this.isShow=true;
                if(this.cookieValue.isTemplateAvailable==true){
                this.isTempalteSelected=true;
                }
            }
            else
            {
              this.isShow=false;
            }
          }
          else{
            this.isShow=false;
          }
      }
    })
  }

   logout()
   {
    this.cookieService.delete('loginData');
    this.cookieValue = this.cookieService.get('loginData');
    this.isShow=false;
    this.router.navigate(['home']);
    location.reload();
   }
  ngOnInit() {
    
  }
  openModal(){
    this.display2="block";
    }

    onCloseHandled(){
      this.display2="none";
     }
     hidePopup(){
      this.display2="none";
      this.display3="none";
     }
     onCloseHandledOtp(){
      this.display4="none";
     }
     onSubmit2(){
      this.submitted2=true;
      if(this.verifyOtpForm.value.transporter_otp == ''|| this.verifyOtpForm.value.transporter_otp == undefined 
      || this.verifyOtpForm.value.user_otp == '' || this.verifyOtpForm.value.user_otp == undefined)
      {
        
      }
      else{
      this.submitted2=false;
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.imageLoader= true;
      this.verifyOtpForm.value.request_id=this.req_id;
      this.apiSerivce.verifyOtp(this.verifyOtpForm.value).subscribe( resultArray =>{ 
      (this.resultantArray2 = resultArray);
      this.testArray=this.resultantArray2;
      this.message = this.resultantArray2.message; 
      // console.log(this.resultantArray2.status)
      this.display2='none';
      if(this.resultantArray2.status==true)
      {
        
        this.display4='none';
         this.display5="block";
      }
      else{
        this.display4='none';
        this.display5="block";
      }
      this.imageLoader= false;
      
    
     
    })
  }
}
   
     onSubmit(){
       this.submitted=true;
      if(this.lrForm.value.transporter_contact_number == ''|| this.lrForm.value.transporter_contact_number == undefined 
      || this.lrForm.value.user_name == '' || this.lrForm.value.user_name == undefined || this.lrForm.value.user_purpose == '' || this.lrForm.value.user_purpose == undefined
      || this.lrForm.value.user_contact_number == '' || this.lrForm.value.user_contact_number == undefined)
      {
        
      }
      else if(this.lrForm.value.transporter_contact_number.length != 10 || this.lrForm.value.user_contact_number.length != 10 ){
        
      }
      else{
      this.submitted=false;
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.imageLoader= true;
      this.apiSerivce.lrRequest(this.lrForm.value).subscribe( resultArray =>{ 
      (this.resultantArray1 = resultArray);
      this.message = this.resultantArray1.message; 
      this.display2='none';
      if(this.resultantArray1.status==true){
        this.display2='none';
        this.display3="block";
        this.isStatus="true";
        this.req_id=this.resultantArray1.response.request_id;
      }
      else{
        this.display3="block";
        this.display4="none";
        this.isStatus="false";
      }
       this.imageLoader= false;
    })
  } 
     }

     hidePopMsg()
     {
       this.display3="none";
        if(this.isStatus=="true")
        {
          this.display4="block";
        }
        else
        {
          this.display2="block";
        }
     }
     hidePopupOtp()
     {
      this.display5="none";
      console.log(this.testArray.response.transporter_id)
      this.router.navigate(['tranporter-lr',this.testArray.response.transporter_id]);
     }

}
