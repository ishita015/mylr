import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MylrService} from './../../../mylr.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Http,Headers,Response, RequestOptions } from '@angular/http';
 import { Observable } from 'rxjs';
 import { freightChallanList } from './../../models/freightchallanlist';
//  import { ResponseModel} from './../../models/response' 
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-list-freight',
  templateUrl: './list-freight.component.html',
  styleUrls: ['./list-freight.component.css']
})
export class ListFreightComponent implements OnInit {
  public challanList:any;
  public responseData:any;
  cookieValue:any;
  transporter_detail:any={};
  public message1:any;
  public filtreArg:freightChallanList;
  public freightChallanList:any;
  public isEmpty=false;
  public challanList1:any;
  imageLoader:any;
  fc_date;    
  filterArgs;
  page;
  
  constructor(private apiSerivce: MylrService,private router : Router,private cookieService:CookieService, private datepipe : DatePipe) {
    this.filterArgs = new freightChallanList();
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
    this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
    this.transporter_detail=this.cookieValue;
    console.log(this.transporter_detail.transporter_id)
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.imageLoader=true;
      this.apiSerivce.freightChallanList({"transporter_id":this.transporter_detail.transporter_id}).subscribe( 
      resultArray =>{ this.challanList = resultArray;
        this.message1=this.challanList.message;
        this.imageLoader=false;

        // this.fc_date =this.datepipe.transform(this.freightChallanList.fc_date, 'dd-MM-yyyy');
        

        if(resultArray.response!=undefined)
        {
          this.challanList1= this.challanList.response.freight_challan_list;
          this.isEmpty=false;
        }
        else
        {
          this.isEmpty=true;         
        }
      })     
    
    }
    else{
    this.router.navigate(['/login']);
      }
    
    }

  ngOnInit() {

}
}
