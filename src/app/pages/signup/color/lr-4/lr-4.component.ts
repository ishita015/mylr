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
  selector: 'app-lr-4',
  templateUrl: './lr-4.component.html',
  styleUrls: ['./lr-4.component.css']
})
export class Lr4Component implements OnInit {
  public schemecolor:string = "#F86A31"
  public temp: any;
  cookieValue: any;
  transporter_id;
  display2;
  imageLoader:boolean=false;
  public templateArray:any=[];
  signupValue:any;
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
    this.signupValue = this.cookieService.get('loginData');
    console.log(this.signupValue);
    if(this.signupValue != '' && this.signupValue != undefined){
      this.signupValue = JSON.parse(this.cookieService.get('loginData'));
      console.log(this.signupValue);
      this.transporter_id=this.signupValue.transporter_id;
     }
    console.log( this.transporter_id);
  }
 
  onSubmit(){
    this.display2='none';
    this.imageLoader=true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.apiSerivce.addtemplate({'transporter_id':this.transporter_id,'template_id':'4','template_color':this.schemecolor,'template_type': '1'}).subscribe( 
     resultArray =>{console.log(this.templateArray=resultArray)
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
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          .test{'background-color':schemecolor}
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
