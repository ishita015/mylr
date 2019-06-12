import { Component, OnInit, ViewChild } from '@angular/core';
import {MylrService} from '../../mylr.service';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { CookieService } from 'ngx-cookie-service';
import { lrRequest } from './../../pages/models/lr-request';
import { verifyOtp } from './../../pages/models/verify-otp';
import { Router } from '@angular/router';
// import { CarouselModule } from 'angular4-carousel';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public display='none';
  public display2='none';
  public display3='none';
  public display5='none';
  public display4= 'none';
  public images=[];
  public testArray:any;
  submitted;
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
  constructor(private apiSerivce: MylrService,private cookieService:CookieService,private router:Router) { 
  
  }

  @ViewChild('owlElement') owlElement: OwlCarousel
  
  fun() {
    this.owlElement.next([200])
    //duration 200ms
  }
  ngOnInit() {
   this.images=[
     {
     "image": "assets/images/img-2.jpg",
     "client_name":"Saurabh Mantri",
     "client_post":"CEO"
     },
     {
     "image": "assets/images/abdeali.jpg",
     "client_name":"Abdeali Siyawala",
     "client_post":"CTO"
     },
     {
     "image": "assets/images/deepak-soni.jpg",
     "client_name":"Deepak Soni",
     "client_post":"COO"
     },
     {
       "image": "assets/images/img-4.jpg",
       "client_name":"Laurie laforest",
       "client_post":"Managing Director- Repairshop"
       },
       {
       "image": "assets/images/img-5.jpg",
       "client_name":"Anselm Haneman",
       "client_post":"Social Manager- Repairshop"
       },
       {
       "image": "assets/images/img-6.jpg",
       "client_name":"Holly Hill",
       "client_post":"Managing Director - Repairshop"
       }
     ]

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
      this.submitted=true;
      if(this.verifyOtpForm.value.transporter_otp == ''|| this.verifyOtpForm.value.transporter_otp == undefined 
      || this.verifyOtpForm.value.user_otp == '' || this.verifyOtpForm.value.user_otp == undefined)
      {
        
      }
      else{
      this.submitted=false;
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
      
       console.log(this.resultantArray2); 
    
     
    })
  }
    this.verifyOtpForm = new FormGroup
      ({
        transporter_otp:new FormControl('', Validators.required),
        user_otp:new FormControl('', Validators.required),
      });


     }
   
     onSubmit(){
       this.submitted=true;
      if(this.lrForm.value.transporter_contact_number == ''|| this.lrForm.value.transporter_contact_number == undefined 
      || this.lrForm.value.user_name == '' || this.lrForm.value.user_name == undefined || this.lrForm.value.user_purpose == '' || this.lrForm.value.user_purpose == undefined
      || this.lrForm.value.user_contact_number == '' || this.lrForm.value.user_contact_number == undefined)
      {
        
      }
      else if(this.lrForm.value.transporter_contact_number.length != 10 && this.lrForm.value.user_contact_number.length != 10 ){
 
      }
      else{
        this.submitted=false;
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.imageLoader= true;
      this.apiSerivce.lrRequest(this.lrForm.value).subscribe( resultArray =>{ 
      (this.resultantArray1 = resultArray);
      this.message = this.resultantArray1.message; 
      console.log(this.resultantArray1.status)
      this.display2='none';
      if(this.resultantArray1.status==true){
       
        this.display2='none';
        this.display3="block";
        this.req_id=this.resultantArray1.response.request_id;
      }
      else{
        this.display3="block";
      }
       this.imageLoader= false;
       console.log(this.resultantArray1); 
    })
  }
    this.lrForm = new FormGroup({
        transporter_contact_number : new FormControl('',Validators.pattern(this.mobnumPattern)),
        user_name:new FormControl('',[Validators.required, Validators.maxLength(50)]),
        user_contact_number:new FormControl('',Validators.pattern(this.mobnumPattern)),
        user_purpose:new FormControl('',[Validators.required,Validators.maxLength(70)]),
      });
       
     }

     hidePopMsg()
     {
       this.display3="none";
       this.display4="block";
     }
     hidePopupOtp()
     {
      this.display5="none";
      this.router.navigate(['tranporter-lr',this.testArray.response.transporter_id]);
     }

}
