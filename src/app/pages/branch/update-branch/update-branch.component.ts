import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
 import {MylrService} from './../../../mylr.service'
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { updatebranch } from './../../models/updatebranch';
 import { Observable } from 'rxjs';
 import 'rxjs/add/operator/map'
 import {ActivatedRoute} from '@angular/router';

@Component({

  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.css']
})
export class UpdateBranchComponent implements OnInit {

  public branchData: updatebranch ;
  public transporter_id:string;
  showSelected:boolean = true;
  contact_person_details;
  branchLat;
  branchLong;
  branchAddress;
  public resultantArray2: updatebranch;
  updateForm = new FormGroup({
 
    transporter_id : new FormControl(""),
    branch_name: new FormControl(""),
    branch_mail: new FormControl(""),
    branch_contact:new FormControl(""),
    branch_address: new FormControl(""),
    branch_lat:new FormControl(""),
    branch_long: new FormControl(""),
    role_id:new FormControl(""),
    city:new FormControl(""),
    state:new FormControl(""),
    contact_person_details:new FormControl(""),
    name:new FormControl(""),
    mobile:new FormControl(""),
    email_id:new FormControl(""),

});

  constructor(private apiSerivce: MylrService,private route : ActivatedRoute) { 
    this.transporter_id = route.snapshot.params['transporter_id']; 
      console.log(this.transporter_id)
      this.updatebranch();
  }
  public updatebranch(){
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
     this.apiSerivce.updatebranch({'transporter_id': this.transporter_id}).subscribe( 
      resultArray =>{console.log(resultArray)
    })
  }

  ngOnInit() {
  }

}
