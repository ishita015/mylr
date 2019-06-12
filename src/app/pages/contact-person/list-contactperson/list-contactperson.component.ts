import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
 import {MylrService} from './../../../mylr.service'
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { updatebranch } from './../../models/updatebranch';
import { Observable } from 'rxjs';
import {listcontactperson} from './../../models/listcontactperson';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
@Component({
  templateUrl: './list-contactperson.component.html',
  styleUrls: ['./list-contactperson.component.css']
})
export class ListContactPersonComponent implements OnInit {
  listcontactperson: any = {}
  public _Array7: listcontactperson;
  public imageLoader:boolean= false;
  cookieValue: any;
  branch_id;
  lrStatus;
  lrMessage;
  page;
  constructor(private apiSerivce: MylrService,private route : ActivatedRoute,private router : Router,private cookieService:CookieService,) {
    this.branch_id = route.snapshot.params['branch_id']; 
      console.log(this.branch_id)
      this.imageLoader= true;
   const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.apiSerivce.listcontactperson({'branch_id':this.branch_id}).subscribe( resultArray =>
      { 
        this.lrStatus = resultArray.status;
            this.lrMessage = resultArray.message;
            console.log(this.lrStatus);
            console.log(this.lrMessage)
            if(this.lrStatus == true){
              
              this.listcontactperson = resultArray,
              this.imageLoader= false;
            }
           else{
           
             this.imageLoader= false;
             
            console.log(this.listcontactperson)
           }
       
      }
    )
    console.log(this.listcontactperson.response);
     }

  ngOnInit() {
  }

}
