import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
 import {MylrService} from './../../../../mylr.service';
import { Http,Headers,Response, RequestOptions } from '@angular/http';
 import { Observable } from 'rxjs';
 import { Router } from '@angular/router';
 import 'rxjs/add/operator/map';
 import {ActivatedRoute} from '@angular/router';
import { addtemplate } from '../../../models/addtemplate';

@Component({
  selector: 'app-lr-3',
  templateUrl: './lr-3.component.html',
  styleUrls: ['./lr-3.component.css']
})
export class Lr3Component implements OnInit {
  public schemecolor:string = "#F86A31"
  public lrDetail:any={}
  public inTime:any=0;
  public outTime:any=0;
  public temp: any;
  cookieValue: any;
  transporter_id;
  public signupValue;
  base64Img;
  invoice_date;
  imageLoader:boolean=false;
  public templateArray:any=[];
  public display2= 'none';

  obj = {
    template_id: '',
    template_color: '',
    template_type:'lr'
    // template_type: '',
  };
  constructor(private router:Router,private apiSerivce: MylrService,private route : ActivatedRoute,private cookieService:CookieService,) { 
    // this.obj = route.snapshot.params['id']; 
 
  }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
      this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
      console.log(this.cookieValue);
      this.signupValue=this.cookieValue
      this.transporter_id=this.cookieValue.transporter_id;
      console.log( this.transporter_id)
     }
    console.log( this.transporter_id);
  }

 
  onSubmit(){
    this.display2='none';
    this.imageLoader=true;
    this.transporter_id=this.cookieValue.transporter_id;
    
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.apiSerivce.addtemplate({'transporter_id':this.transporter_id,'template_id':'3','template_color':this.schemecolor,'template_type': '3'}).subscribe( 
     resultArray =>{console.log(this.templateArray=resultArray)
      this.imageLoader=false;
      if(this.templateArray.status == true)
      {
        console.log(this.templateArray)
        this.display2='block';
        this.cookieValue.isTemplateAvailable = true;
        this.cookieValue.template_id = this.templateArray.response.template_id;
        this.cookieValue.template_color = this.templateArray.response.template_color;
     
        this.cookieService.set('loginData',JSON.stringify(this.cookieValue));
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
    const innerContents = document.getElementById('partToPrint').innerHTML;
    popupWinindow = window.
        open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,header=no');
    popupWinindow.document.open();
    popupWinindow.document.
        write('<html><head></head><body onload="window.print()">' +
            innerContents + '</html>');
    popupWinindow.document.close();
}

}
