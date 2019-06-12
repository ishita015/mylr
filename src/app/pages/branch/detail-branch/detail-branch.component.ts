import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
 import {MylrService} from './../../../mylr.service'
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { updatebranch } from './../../models/updatebranch';
 import { Observable } from 'rxjs';
 import {detailbranch} from './../../models/detailbranch';
 import 'rxjs/add/operator/map'
 import { Router } from '@angular/router';
@Component({
  templateUrl: './detail-branch.component.html',
  styleUrls: ['./detail-branch.component.css']
})
export class DetailBranchComponent implements OnInit {
  public listbranch: any = []
  cookieValue: any;
  public imageLoader:boolean= false;
  transporter_id;
  page;

  constructor(private apiSerivce: MylrService,private router : Router,private cookieService:CookieService,) {
    // this.cookieValue = this.cookieService.get('loginData');
   const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
   this.imageLoader= true;
   if(this.cookieService){
    this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
    console.log(this.cookieValue.transporter_id);
   }
   this.transporter_id=this.cookieValue.transporter_id
    // this.cookieValue = this.cookieService.get('loginData');
    this.apiSerivce.detailbranch({'transporter_id':this.transporter_id}).subscribe( resultArray =>{ this.listbranch = resultArray,  this.imageLoader= false;})
     console.log(this.listbranch);
     }

  ngOnInit() {
  }

}
