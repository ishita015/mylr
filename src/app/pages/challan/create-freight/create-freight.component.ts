import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { addFreight } from './../../../../app/pages/models/addfreight';
import { Router } from '@angular/router';
import {IMyDpOptions, IMyDate, IMyDateModel} from 'mydatepicker';
import { freightAutoFill } from './../../models/freightautofill';
//import { IMyDpOptions } from 'mydatepicker';
import { MylrService } from './../../../mylr.service';
import {fcIdGet} from './../../models/fcidget';
@Component({
  templateUrl: './create-freight.component.html',
  styleUrls: ['./create-freight.component.css']
})
export class CreateFreightComponent implements OnInit {
  count;
  freightForm;
  less_advance;
  balance;
  public total_freight;
  public vehicleListData=[];
  public loading_challan_no;
  // freight_challan_details:any=[];
  cookieValue:any;
  transporter_detail:any;
  submitted:any;
  driverSubmitted:any;
  displayError;
  freightResult:any=[];
  display2;
  message;
  isShow1;
  other_charges;
  obj;
  public filterArg:freightAutoFill;
  IMyDpOptions:any;
   displayError1="none";
   formatted;
   lrUnableData;
   states;
    displayLc = 'none';
   freightDetail;
   loadingId;
   public imageLoader=false
   public isChange;
   public Currentdate:any;
  // public errors:any;
  d: Date = new Date();
  myDatePickerOptions:IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() - 1},
};

public selDate: IMyDate = {year: 0, month: 0, day: this.Currentdate};
  public freight_challan_details:Array<{"particular":string,"packages":string,"weight":string}>
  constructor(private router:Router,private cookieService:CookieService,
    private newService:MylrService) {
      this.filterArg = new freightAutoFill();
      this.freight_challan_details = []
      this.freight_challan_details.push({"particular":"","packages":"","weight":""})

     }
    //  d: Date = new Date();
    //  public myDatePickerOptions1: IMyDpOptions = {
    //   // other options...
    //   dateFormat: 'yyyy-mm-dd',
    //   editableDateField: false,
    //    openSelectorOnInputClick: true,
    //   height: '25px',
    //   disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() - 1},
    // };

 
  ngOnInit() {
    let d: Date = new Date();
    this.selDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
    console.log(this.selDate)
    let date1 = new Date();
    console.log(date1);
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
     this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
   
     this.transporter_detail=this.cookieValue;
     console.log(this.transporter_detail)
    }
    else{
     this.router.navigate(['/login']);
    }
    this.freightForm = new FormGroup({
      transporter_id: new FormControl(''),
      template_id: new FormControl('1'),
      lr_no: new FormControl('', Validators.required),
      fc_date: new FormControl('date1', Validators.required),
      // challan_no: new FormControl('', Validators.required),
      vehicle_number: new FormControl('', Validators.required),
      voucher_reference_number: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      broker_name: new FormControl('', Validators.required), 
      broker_address:new FormControl('', Validators.required), 
      broker_contact:new FormControl('', Validators.required), 
      engine_number:new FormControl('', Validators.required), 
      chassis_number:new FormControl('', Validators.required), 
      owner_name:new FormControl('', Validators.required),
      owner_address:new FormControl('', Validators.required),
      owner_pan_number:new FormControl('', Validators.required),
      driver_name:new FormControl('', Validators.required),
      driver_father_name:new FormControl('', Validators.required),
      owner_mobile:new FormControl('', Validators.required),
      driver_address:new FormControl('', Validators.required),
      driver_contact:new FormControl('', Validators.required),
      driver_license_number:new FormControl('', Validators.required),
      remark:new FormControl('', Validators.required),
      
      // particular:new FormControl('', Validators.required),
      // packages:new FormControl('', Validators.required),
      // weight:new FormControl('', Validators.required),
      freight_challan_details:new FormControl('', Validators.required),
      freight_challan_charges: new FormGroup({ 
        rate_pmt:new FormControl('', Validators.required),
        other_charges:new FormControl('', Validators.required),
        total_freight:new FormControl('', Validators.required),
        less_advance:new FormControl('', Validators.required),
        balance:new FormControl('', Validators.required),
        pay_at:new FormControl('', Validators.required),
        
      })

    })
    this.less_advance=0
    this.other_charges=0
    this.balance=0
    // this.convertToInt(0)
    this.newService.fcIdGet({'transporter_id':this.cookieValue.transporter_id}).subscribe( 
     resultArrays =>
     {
       
       this.lrUnableData = resultArrays; 
      
       if(this.lrUnableData.status == false){
        this.message = this.lrUnableData.message;
        console.log(this.message)
        this.displayLc = 'block';
       }
        else{
          console.log('a')
          // this.freightDetail = this.lrUnableData.response;
       this.states = this.lrUnableData.response;
       this.states.forEach(obj =>{
        console.log(obj.loading_challan_id);
        this.loadingId = obj.loading_challan_id;
         
       })
      //  console.log(this.freightDetail.loading_challan_id);
        }
        console.log(this.loadingId)
        
   })

//-----------------------------------------------------------------------------         


   this.newService.vehicleList({'transporter_id':this.cookieValue.transporter_id}).subscribe(result =>{
      this.vehicleListData=result.response;
      console.log( this.vehicleListData)
   })
  
  }

  vehicleListShow()
  {
  this.isShow1 = true;
  } 

  searchVehicle(vehicleNo){
     console.log(vehicleNo)
    this.filterArg.vehicle_number = vehicleNo ;
    // console.log(this.createlrList2);
    this.obj = this.vehicleListData.find(function(v){return v.vehicle_number == vehicleNo});
  
     console.log(this.obj);
    this.filterArg.engine_number = this.obj.engine_number;
    this.filterArg.chassis_number = this.obj.chassis_number;
    this.filterArg.owner_name=this.obj.owner_name;
    this.filterArg.owner_address=this.obj.owner_address;    
    this.filterArg.owner_pan_number=this.obj.owner_pan_number;
    this.filterArg.driver_name=this.obj.driver_name;
    this.filterArg.driver_father_name=this.obj.driver_father_name;
    this.filterArg.driver_address=this.obj.driver_address;
    this.filterArg.driver_contact=this.obj.driver_contact;
    this.filterArg.driver_license_number=this.obj.driver_license_number;
    
    

  
    // console.log(this.filterArg.consignor_gstn)
    this.isShow1 = false;
    let i =-1;
    for ( i = 0; i < this.vehicleListData.length; i++) {
    const element = this.vehicleListData[i];
    // console.log(element)
    if(element.vehicle_number==vehicleNo){
     console.log(element.name)
    break ; 
    }
    }
    }


    total(){
      
    }
    convertToInt(val)
  {
    // alert("1")
    return parseInt(val);
  }
 
  logDropdown(loading_challan_id: any): void {
    this.isChange=false;
    console.log(loading_challan_id)
    this.loading_challan_no=loading_challan_id;
    let  i =-1;
    for ( i = 0; i < this.states.length; i++) {
      const element = this.states[i];
      console.log(element)
      if(element.loading_challan_id==loading_challan_id){
        console.log(element.loading_challan_detail)
        
        this.freight_challan_details = element.loading_challan_detail
        break ; 
      }
    }
  }
  


    // const consignor_name = this.states.find((state: any) => state.lr_id === +lr_id).consignor_name;
   
    // this.log += `Value ${consignor_name} was selected\n`;

    // const consignee_name = this.states.find((state: any) => state.lr_id === +lr_id).consignee_name;
    // this.log += `Value ${consignee_name} was selected\n`;
  
  submitFreight(freightForm)
  {
     this.submitted=true;
     console.log(this.freightForm.value)
     console.log(this.freightForm.value.fc_date.formatted)

     if(this.loading_challan_no==''||this.loading_challan_no==undefined){
      this.isChange=true;
     }
     
    // this.freightForm.value.fc_date = freightForm.value.fc_date.jsdate;
    var form_date = freightForm.value.fc_date.jsdate,
    month = '' + (form_date.getMonth() + 1),
    day = '' + form_date.getDate(),
    year = form_date.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var p = [year, month, day].join('-');
    console.log(p)
    this.freightForm.value.fc_date=p;
    this.freightForm.value.loading_challan_id = this.loadingId;
    this.freightForm.value.freight_challan_details=this.freight_challan_details;
    this.freightForm.value.transporter_id=this.transporter_detail.transporter_id;
    if(this.freightForm.value.engine_number==''||this.freightForm.value.engine_number==undefined){
      this.freightForm.value.engine_number='';
     }
      if(this.freightForm.value.chassis_number==''||this.freightForm.value.chassis_number==undefined){
      this.freightForm.value.chassis_number='';
     }
      if(this.freightForm.value.owner_name==''||this.freightForm.value.owner_name==undefined){
      this.freightForm.value.owner_name='';
     }
      if(this.freightForm.value.owner_pan_number==''||this.freightForm.value.owner_pan_number==undefined){
      this.freightForm.value.owner_pan_number='';
     }
      if(this.freightForm.value.owner_address==''||this.freightForm.value.owner_address==undefined){
      this.freightForm.value.owner_address='';
     }
     if(this.freightForm.value.driver_name==''||this.freightForm.value.driver_name==undefined){
      this.freightForm.value.driver_name='';
     }
     if(this.freightForm.value.driver_license_number==''||this.freightForm.value.driver_license_number==undefined){
      this.freightForm.value.driver_license_number='';
     }
     if(this.freightForm.value.driver_father_name==''||this.freightForm.value.driver_father_name==undefined){
      this.freightForm.value.driver_father_name='';
     }
     if(this.freightForm.value.driver_contact==''||this.freightForm.value.driver_contact==undefined){
      this.freightForm.value.driver_contact='';
     }
     if(this.freightForm.value.driver_address==''||this.freightForm.value.driver_address==undefined){
      this.freightForm.value.driver_address='';
     }
     if(this.freightForm.value.rate_pmt == '' || this.freightForm.value.rate_pmt==undefined)
     {
      this.freightForm.value.rate_pmt='';
     }
    // this.freightForm.value.fc_date=this.freightForm.value.fc_date.formatted;
    //  if(this.freightForm.value.fc_date==undefined || this.freightForm.value.fc_date=="")
    //  {
      
    //  }
    
    
     if(this.freightForm.value.vehicle_number!="" && this.freightForm.value.from!="" && this.freightForm.value.broker_name!=""  
    && this.freightForm.value.freight_challan_charges.less_advance!=undefined&& this.freightForm.value.freight_challan_charges.balance!=undefined
    && this.freightForm.value.freight_challan_charges.less_advance!=undefined&&
      this.freightForm.value.freight_challan_charges.pay_at!=""&& this.freightForm.value.broker_contact!="")
    {
      console.log(this.freightForm.value)
      if((this.freightForm.value.driver_contact != '' || this.freightForm.value.driver_contact != undefined)&& this.freightForm.value.driver_contact.length != 10 && this.freightForm.value.driver_contact.length !=0)
      {
        console.log(this.freightForm.value)
        this.driverSubmitted=true;
      }
     else if( this.freightForm.value.broker_contact.length==10)
      {
        console.log(this.freightForm.value)
        this.total_freight=parseInt(this.freightForm.value.freight_challan_charges.less_advance)+(this.freightForm.value.freight_challan_charges.balance)
                            +parseInt(this.freightForm.value.freight_challan_charges.other_charges)
                           
       this.freightForm.value.freight_challan_charges.total_freight=this.total_freight
       console.log(this.freightForm.value)
      this.newService.addFreight(this.freightForm.value).subscribe(resultArray => {
        this.freightResult = resultArray;
        
        console.log(this.freightResult);
        if(this.freightResult.status == true){
          this.message = this.freightResult.message;
          this.display2="block";
        }
        else{
          this.display2="block";
        }
    })
    }
    }
    else
    {
      
    }
  }

  hidePop()
  {
    this.display2="none";
    this.router.navigate(['/freight-challan/list']);
  }
  public addRow(){
    
    this.freight_challan_details.push({"particular":"","packages":"","weight":""})
    this.count++;  
    console.log(this.freight_challan_details)
    return false;
}

 
public deleteRow(i){
  this.count--;
  this.freight_challan_details.splice(i,1);
  return false;
}

hidePopupLc() {
  this.displayLc = 'none';
    this.router.navigate(['/loading-challan/create']);
}

}
