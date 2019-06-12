import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MylrService} from './../../../mylr.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Http,Headers,Response, RequestOptions } from '@angular/http';
 import { Observable } from 'rxjs';
 import { lrList } from './../../models/lrlist'
 import { DatePipe } from '@angular/common'

@Component({
  templateUrl: './lr-list.component.html',
  styleUrls: ['./lr-list.component.css']
})
export class LrListComponent implements OnInit {
public lrDataList: any = {};
public transporter_id:number;
public filtreArg:lrList;
public imageLoader:boolean = false;
lrStatus;
lrMessage;
loading_date;
page;
  cookieValue: any;
  constructor(private apiSerivce: MylrService,private router : Router, private cookieService : CookieService, private datepipe : DatePipe) { 
   
      
    }
     ngOnInit()
     {
      this.cookieValue = this.cookieService.get('loginData');
      if(this.cookieValue != '' && this.cookieValue != undefined){
        this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
        this.transporter_id=this.cookieValue.transporter_id;
        console.log(this.transporter_id);
      }
      else{
       this.router.navigate(['/login']);
      }
  
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.imageLoader = true;
      

        this.apiSerivce.lrList({"transporter_id":this.transporter_id}).subscribe( 
          resultArray =>{ 
            console.log(resultArray.status)
            this.lrStatus = resultArray.status;
            this.lrMessage = resultArray.message;
            console.log(this.lrStatus);
            console.log(this.lrMessage)
            if(this.lrStatus == true){
              // alert('2');
              this.lrDataList = resultArray.response;
              this.lrDataList.forEach(item => {
                item.loading_date =this.datepipe.transform(item.loading_date, 'dd-MM-yyyy'); 
              });
                      
           
            console.log (this.lrDataList)
            }
           else{
            //  alert('1');
            console.log(this.lrDataList)
           }
            
            this.imageLoader = false;
          })
            this.lrDataList;
            this.filtreArg = new lrList();
     }
   }



