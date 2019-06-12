import { Component, OnInit } from '@angular/core';
import {MylrService} from './../../../mylr.service'
import { loadingChallanList } from './../../models/loading-challan-list';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { loadingChallanPipe } from './loading-challan-filter.pipe';


@Component({
  selector: 'app-lc-list',
  templateUrl: './lc-list.component.html',
  styleUrls: ['./lc-list.component.css']
})
export class LcListComponent implements OnInit {

  cookieValue: any;
  LoadingChallanList:loadingChallanList;
  ad_files;
  displayadvert = "none";
  submitted:boolean;
  files: any;
  admin_id:any;
  public transporter_id;
  image_url;
  display2="none";
  message;
  status;
  response;
  page;
  loadingChallanStatus;
  loadingChallanMessage;
  public imageLoader:boolean=false;
  ad_title;
  filterArgs;


//---------------------------   List of loadingChallan  -----------------------------------------------
ngOnInit() {
  this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
      this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
      this.transporter_id=this.cookieValue.transporter_id;
      console.log(this.transporter_id);
    }
    else{
     this.router.navigate(['/login']);
}
this.filterArgs = new loadingChallanList();
console.log(this.transporter_id)
this.imageLoader= true;
this.newService.loadingChallanList({"transporter_id":this.transporter_id}).subscribe(
  resultArray => 
  { 
    this.loadingChallanStatus = resultArray.status;
        this.loadingChallanMessage = resultArray.message;
        console.log(this.loadingChallanStatus);
        console.log(this.loadingChallanMessage)
        if(this.loadingChallanStatus == true){
          
          this.LoadingChallanList = resultArray.response,
          console.log(this.LoadingChallanList)
          this.imageLoader= false;
        }
       else{
       
         this.imageLoader= false;
         
       }
   
  }
 
)

}

constructor(private router:Router,private newService:MylrService,private cookieService:CookieService) {
  // this.cookieValue = JSON.parse(this.cookieService.get('loginData'));

}

}
