import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
 import {MylrService} from './../../../../mylr.service'
import { Http,Headers,Response, RequestOptions } from '@angular/http';
 import { Observable } from 'rxjs';
 import { Router } from '@angular/router';
 import 'rxjs/add/operator/map'
 import {ActivatedRoute} from '@angular/router';
import { addtemplate } from '../../../models/addtemplate';

@Component({
  selector: 'app-lr-5',
  templateUrl: './lr-5.component.html',
  styleUrls: ['./lr-5.component.css']
})
export class Lr5Component implements OnInit {
  public schemecolor:string = "#F86A31"
  public temp: any;
  cookieValue: any;
  transporter_id;
  display2;
  imageLoader:boolean=false;
  public templateArray:any=[];

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
    
      this.transporter_id=this.cookieValue.transporter_id;
      console.log( this.transporter_id)
     }
  }
  
  onSubmit(){
    this.display2='none';
    this.imageLoader=true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // this.cookieValue = this.cookieService.get('loginData');
   
     this.transporter_id=this.cookieValue.transporter_id
    this.apiSerivce.addtemplate({'transporter_id':this.transporter_id,'template_id':'5','template_color':this.schemecolor,'template_type': '5'}).subscribe( 
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
