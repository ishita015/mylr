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


@Component({
  selector: 'app-list-voucher',
  templateUrl: './list-voucher.component.html',
  styleUrls: ['./list-voucher.component.css']
})
export class ListVoucherComponent implements OnInit {

  public voucherList: any;
  public transporter_id:number;
  public filtreArg:lrList;
  public imageLoader:boolean = false;
  public showList:boolean = false;
  voucherStatus;
  lr_id;
  message;
  voucherMessage;
  cookieValue: any;
  display2:string = 'none';
  public isValid:boolean=false;
    
  constructor(private apiSerivce: MylrService,private router : Router, private cookieService : CookieService) { 
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

}

keyPress(lr_id)
{  
  if(lr_id)
  {
    return this.isValid=true;
  }
  else{
    return this.isValid=false;
  }
}

      findVouchers(lr_id){
        if(lr_id)
        {
        this.showList = true;
        this.imageLoader = true;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.apiSerivce.listVouchers({"lr_id":lr_id}).subscribe( 
            resultArray =>{ 
              this.voucherStatus = resultArray.status;
              this.voucherMessage = resultArray.message;
            if(this.voucherStatus == true){
                this.voucherList = resultArray.response;
                this.imageLoader = false;
                console.log(this.voucherList)
              }
             else{
              this.imageLoader = false;
              console.log(this.voucherList)
             }
       })
      }
    }
}
