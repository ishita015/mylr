import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {MylrService} from '../../mylr.service';

@Component({
  selector: 'app-verification-id',
  templateUrl: './verification-id.component.html',
  styleUrls: ['./verification-id.component.css']
})
export class VerificationIdComponent implements OnInit {
  public display2='block';
  public condition:string;
  public message:string;
  submitted : boolean
  cookieValue: any;
  // display2='none';
  display3='none';
  public isShowRetry:any={}
  public ArrayLogin: any;
  public RetryLogin: any;
  // public transporter_id:any={};
  public isShow:any={}
  public imageLoader:boolean = false;
  public transporter_id:number;
  constructor(private route : ActivatedRoute,private router : Router,private newService:MylrService,private cookieService:CookieService) {

   }

  ngOnInit() {
    this.transporter_id = this.route.snapshot.params['transporter_id']; 
    console.log(this.transporter_id)
    if(this.transporter_id)
    {
      this.message = "Something Went Wrong"
      this.display2="block";
    }
  }

 
  retryLogin()
  {
    this.display2="none";
    this.newService.reSend({'transporter_id':this.transporter_id}).subscribe(resultArray => {
            this.RetryLogin=resultArray;
            this.message = this.RetryLogin.message,
            this.display3="block";
            console.log(this.RetryLogin.message)          
          })
          // setTimeout(function(){
          //   this.messageSuccess = false;
          // },3000);
  }
  hidePop(){
    this.display3="none";
  }

}
