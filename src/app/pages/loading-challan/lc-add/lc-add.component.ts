import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import {MylrService} from './../../../mylr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {IMyDpOptions, IMyDate, IMyDateModel} from 'mydatepicker';
import {lrIdGet} from './../../models/lridget';

import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingChallanAdd } from './../../models/loading-challan-add';
import { concat } from 'rxjs/operator/concat';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';


@Component({
  selector: 'app-lc',
  templateUrl: './lc-add.component.html',
  styleUrls: ['./lc-add.component.css']
})
export class LcAddComponent implements OnInit {  
  lrForm;
  display2 = 'none';
  submitted: boolean = false;
  message: string;
  lrsuccess: any;
  imageLoader: boolean = false;
  states;
  cookieValue: any;
  transporter_detail:any;
  obj;
  response:any;
  set;
  sum;
  sum1;
  lrUnableData;
  public total_amount;
  public count =0;
  displayLc = 'none';
  public date_of_loading;
  public loading_challan_detail:Array<{"lr_date": any,"lr_id":any,"lr_number":any,"consignor":any,"consignee":any,"to":any,"boxes":any,"goods":any,"weight":any,"freight_type":any,"amount":any}>
  d: Date = new Date();
  myDatePickerOptions:IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() - 1},
};
public selDate: IMyDate = {year: 0, month: 0, day: 0};
  constructor(private router:Router,private cookieService:CookieService,
    private newService:MylrService) { 
      this.loading_challan_detail = [];
      // this.loading_challan_detail.push({"lr_date":"","lr_number":"","consignor":"","consignee":"","from":"","boxes":"","goods":"","weight":"","freight_type":"","amount":""})
      this.cookieValue = this.cookieService.get('loginData');
      if(this.cookieValue != '' && this.cookieValue != undefined){
       this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
     
       this.transporter_detail=this.cookieValue;
       console.log(this.transporter_detail.transport_logo);
      }
      else{
       this.router.navigate(['/login']);
      }
    }

  ngOnInit() {

    let date1 = new Date();
    console.log(date1)
    this.lrForm = new FormGroup({
      lr_id: new FormControl(),
      transporter_id: new FormControl('', Validators.required),
      template_id: new FormControl('6', Validators.required),
      // lr_number: new FormControl('', Validators.required),
      vehicle_number: new FormControl('', Validators.required),
      // consignor_address: new FormControl('', Validators.required),
      // from: new FormControl('', Validators.required),
      date_of_loading: new FormControl('date1', Validators.required),
      loading_staff_name: new FormControl('', Validators.required),
      contact_number:new FormControl('', Validators.required),
      from:new FormControl('', Validators.required),
      total_tbb_freight:new FormControl('', Validators.required) ,
      total_topay_freight:new FormControl('', Validators.required) ,
      total_paid_freight:new FormControl('', Validators.required) ,
      note:new FormControl('', Validators.required),
      loading_challan_detail:new FormControl('', Validators.required)
    })
    this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
   console.log( this.cookieValue.transporter_id)

   const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.newService.lrIdGet({transporter_id:this.cookieValue.transporter_id}).subscribe( 
     resultArray =>{
       this.lrUnableData = resultArray; 
       console.log(this.lrUnableData)
       if(this.lrUnableData.status == false){
        this.message = this.lrUnableData.message;
        console.log(this.message)
        this.displayLc = 'block';
       }
        else{
        
      //  this.states = this.lrUnableData.response;
      //  console.log(this.states)
      this.states = [];
      this.lrUnableData.response.forEach(obj => {
        obj.isSelected = false;
        this.states.push(obj);
        //  console.log(this.sum1)
      });
        }
   })

   let d: Date = new Date();
        this.selDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
        console.log(this.selDate)
  }
  logDropdown(lr_id: any): void {
    // console.log(lr_id)
    let i = -1;
    for (i = 0; i < this.states.length; i++) {
      const element = this.states[i];
      console.log(element);
      
      if (element.lr_id == lr_id) {
        break;
      }
    }
    if (i > -1 && i != this.states.length) {
      this.sum = 0;
      if (this.loading_challan_detail.length > 0) {
        let l = -1;
        for (l = 0; l < this.loading_challan_detail.length; l++) {
          const element = this.loading_challan_detail[l];
          if (element.lr_id == lr_id) {
            break;
          }
        }

        if (l > -1 && l != this.loading_challan_detail.length) {
        } else {
          this.states[i].isSelected = true;

          this.loading_challan_detail.push(this.states[i]);
        }
      } else {
        this.states[i].isSelected = true;
        this.loading_challan_detail.push(this.states[i]);
      }

      // this.states.splice(i,1);
      this.loading_challan_detail.forEach(obj => {
        this.sum += parseInt(obj.weight);
        // console.log(this.sum)
      });
      this.sum1 = 0;
      this.total_amount=0
      this.loading_challan_detail.forEach(obj => {
        this.sum1 += parseInt(obj.amount);
        console.log(obj)
        if(obj.freight_type=='2')
      {
        
        this.total_amount+=parseInt(obj.amount)
        console.log(this.total_amount)
      }
        //  console.log(this.sum1)
      });
    }

    // const consignor_name = this.states.find((state: any) => state.lr_id === +lr_id).consignor_name;

    // this.log += `Value ${consignor_name} was selected\n`;

    // const consignee_name = this.states.find((state: any) => state.lr_id === +lr_id).consignee_name;
    // this.log += `Value ${consignee_name} was selected\n`;
  }

 


//   select(stateid){
//     console.log(stateid);
//     alert('1');
//  this.obj = stateid;
//  console.log(this.obj)
  //   this.obj = this.set.find(function(stateid)
  //   {
  //     alert('1')
  //     return this.obj == stateid
  //   }
  // );
  // console.log(this.states)

  //       console.log(this.obj);
      
  submitLr(lrForm){
    console.log(lrForm.value);
    this.submitted = true;
    this.date_of_loading=new Date();
    console.log(this.loading_challan_detail);
    // this.lrForm.value.date_of_loading = this.lrForm.value.date_of_loading.formatted;
    var form_date = lrForm.value.date_of_loading.jsdate,
    month = '' + (form_date.getMonth() + 1),
    day = '' + form_date.getDate(),
    year = form_date.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var p = [year, month, day].join('-');
    console.log(p)
    this.lrForm.value.date_of_loading=p;
    this.lrForm.value.loading_challan_detail=this.loading_challan_detail;
    this.lrForm.value.transporter_id=this.cookieValue.transporter_id;

    // this.lrForm.value.packages =  this.lrForm.value.charge_details.packages;
    // console.log(this.lrForm.value.packages);
    // delete this.lrForm.value.charge_details.packages;

      // this.lrForm.value.particular =  this.lrForm.value.charge_details.particular;
      // delete this.lrForm.value.charge_details.particular;

      // this.lrForm.value.actual_weight =  this.lrForm.value.charge_details.actual_weight;
      // delete this.lrForm.value.charge_details.actual_weight;
    
    if(this.lrForm.value.date_of_loading != '' && this.lrForm.value.consignor != '' && this.lrForm.value.consignee != '' && this.lrForm.value.vehicle_number != '' 
    && this.lrForm.value.contact_number != '' && this.lrForm.value.from != '' 
     && this.lrForm.value.loading_challan_detail != '' )
    {
     if(this.lrForm.value.contact_number.length==10){

        this.imageLoader = true;
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.newService.LoadingChallanAdd(this.lrForm.value).subscribe(resultArray => {
        this.lrsuccess = resultArray;
        console.log(this.lrsuccess.response);
        if(this.lrsuccess.status == true){
          this.message = this.lrsuccess.message;
          this.display2= "block";
          this.imageLoader = false;
        }else {
          this.display2= "block";
          this.imageLoader = false;
        }
        
    })
  }
     }
    // }
}
 onChange(event: any, input: any) {
    let reader = new FileReader();
    let imageArray = [];
   console.log(event.target.files.length);
   for(let i=0; i<event.target.files.length; i++){
    let file = event.target.files[i];
    reader.readAsDataURL(file);
    console.log(reader.result);
    imageArray.push(reader.result)
   }
   console.log(imageArray);
}
onChanaage(event) {
  
  if(event.target.files && event.target.files.length > 0) {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    console.log(reader.result);
   };
  }
  public addContact(){
    // if(this.count>5){
      this.count++;
    // }else{
      this.loading_challan_detail.push({"lr_date":"","lr_id":"","lr_number":"","consignor":"","consignee":"","to":"","boxes":"","goods":"","weight":"","freight_type":"","amount":""})
      console.log(this.loading_challan_detail)
  }
  
  // public deleteContact(i){
  //   this.count--;
    
  //   this.loading_challan_detail.splice(i,1);
  //   this.sum = 0;
  //   this.loading_challan_detail.forEach(obj =>{
   
  //     this.sum += parseInt(obj.weight);
  //     console.log(this.sum)
       
  //    })
  
  
  //    this.sum1 = 0;
  //   this.loading_challan_detail.forEach(obj =>{
     
  //    this.sum1 += parseInt(obj.amount);
  //    console.log(this.sum1)
      
  //   })
  // }


  public deleteContact(c,index) {
    this.count--;
    console.log(c,index);
    // let i = - 1;
    // for (i = 0; i < this.states.length; i++) {
    //   const element = this.states[i];
    //   console.log(element);
    //   if (element.lr_id == c.lr_id) {
    //     break;
    //   }
    // }
    // if (i > -1 && i != this.states.length) {
    //   this.states[i].isSelected = false;
    // } 

    this.loading_challan_detail.splice(index, 1);
    this.sum = 0;
    this.loading_challan_detail.forEach(obj => {
      this.sum += parseInt(obj.weight);
      // console.log(this.sum)
    });

    this.sum1 = 0;
    this.loading_challan_detail.forEach(obj => {
      this.sum1 += parseInt(obj.amount);
      //  console.log(this.sum1)
    });
  }

  hidePop() {
  this.display2 = 'none';
  console.log(this.lrsuccess.lc_id)
  this.router.navigate(['loading-challan/detail/',this.lrsuccess.response.lc_id]);
  }

  hidePopupLc() {
    this.displayLc = 'none';
      this.router.navigate(['/lr/create']);
  }

}

