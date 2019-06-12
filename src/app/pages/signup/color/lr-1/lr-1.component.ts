import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
 import {MylrService} from './../../../../mylr.service'
import { Http,Headers,Response, RequestOptions } from '@angular/http';
 import { Observable } from 'rxjs';
 import { Router } from '@angular/router';
 import 'rxjs/add/operator/map'
 import {ActivatedRoute} from '@angular/router';
import { addtemplate } from '../../../models/addtemplate';

@Component({
  selector: 'app-lr-1',
  templateUrl: './lr-1.component.html',
  styleUrls: ['./lr-1.component.css']
})
export class Lr1Component implements OnInit {
  public schemecolor:string = "#F86A31"
  public temp: any;
  public lrDetail: any = {};
  public inTime:any=0;
  public outTime:any=0;
 public signupValue: any;
  transporter_id;
  loading_date;
  display2;
  invoice_date;
  datepipe;
  base64Img;
  out_date;
  freight_type;
  imageLoader:boolean=false;
  public templateArray:any=[];
  displaybankdetails;
  obj = {
    template_id: '',
    template_color: '',
    template_type:'1'
    // template_type: '',
  };
  constructor(private router:Router,private apiSerivce: MylrService,private route : ActivatedRoute,private cookieService:CookieService,) { 
    
 
  }
  ngOnInit() {
    this.signupValue = this.cookieService.get('loginData');
    console.log(this.signupValue);
    if(this.signupValue != '' && this.signupValue != undefined){
      this.signupValue = JSON.parse(this.cookieService.get('loginData'));
      console.log(this.signupValue);
      this.transporter_id=this.signupValue.transporter_id;
     }
    console.log( this.transporter_id);
     this.detail();

  }

  detail()
  {
    this.imageLoader=true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.apiSerivce.lrDetail({"lr_id": '192'})
    .subscribe( 
        resultArray =>{ this.lrDetail = resultArray.response;
        this.imageLoader=false;
       
        })
  }



 
  onSubmit(){
    this.display2='none';
    this.imageLoader=true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // this.cookieValue = this.cookieService.get('loginData');
    
    // this.transporter_id=this.cookieValue.response.transporter_id
    this.apiSerivce.addtemplate({'transporter_id':this.transporter_id,'template_id':'1','template_color':this.schemecolor,'template_type': '1'}).subscribe( 
     resultArray =>{
      console.log(this.templateArray=resultArray)
      this.imageLoader=false;
      if(this.templateArray.status == true)
      {
        console.log(this.templateArray)
        this.display2='block';
        this.signupValue.isTemplateAvailable = true;
        this.signupValue.template_id = this.templateArray.response.template_id;
        this.signupValue.template_color = this.templateArray.response.template_color;
     
        this.cookieService.set('loginData',JSON.stringify(this.signupValue));
       // console.log(this.cookieService.get('loginData'));
      }
      else if(this.templateArray.status == false){
        console.log(this.templateArray)
        this.display2='block';
      }
    })
    
  }

  
  setSchemeColor(color){
     this.schemecolor = color
     console.log( this.schemecolor)
  }
 
  hidePopup()
  {
    this.display2='none';
    this.router.navigate(['/dashboard']) 
  }

 
  print(): void {
    let printContents, popupWinindow;
    printContents = document.getElementById('print-section').innerHTML;
    const innerContents = document.getElementById('print-section').innerHTML;
  popupWinindow = window.
      open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,header=no');
  popupWinindow.document.open();
  popupWinindow.document.
      write('<html><head></head><body onload="window.print()">' +
          innerContents + '</html>');
  popupWinindow.document.close();
}

}
