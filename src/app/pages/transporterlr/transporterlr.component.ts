import { Component, OnInit } from '@angular/core';
import { NgForm,FormControl, FormGroup, } from '@angular/forms';
// import { lrCreate } from './create-lr-form.model';
import {MylrService} from './../../mylr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import {lrCreate} from './../models/lr-create';
// import { toUnicode } from 'punycode';
import {IMyDpOptions, IMyDate, IMyDateModel} from 'mydatepicker';
import { CreateLrFilterPipe } from './../../pages/create-lr-form/filter.pipe';
import {searchConsignorList} from './../models/searchConsignorList';
import {consignorList} from './../models/consignorList';
import { Timestamp } from 'rxjs/operators/timestamp';

@Component({
  selector: 'app-transporterlr',
  templateUrl: './transporterlr.component.html',
  styleUrls: ['./transporterlr.component.css']
})
export class TransporterlrComponent implements OnInit {
  public lr:lrCreate;
  public createlrList3: any = {};
  public lr5:any = {};
  public filterArg:lrCreate;
  public createlrList: any = {};
  public createlrList2: any = {};
  public balanceIsZero:boolean=false;
  public topayIsZero:boolean=false;
  public searchConsignorList:searchConsignorList;
  public consignorList:consignorList;
  public isVehicleList:boolean=false;
  testArray;
  public freight_type=0;
  public gst_pay_by=0; 
  transporter_id;
  obj;
  obj1;
  obj2;
  lr2;
  lr3;
  lr4;
  cookieValue:any;
  transporter_detail:any;
  public lrData:any = {} ;
  public testData:any;
  // consignor_address:any;
  // consignee_address:any;
  imageLoader;
  public isShow:boolean=false;
  public isShow1:boolean=false;
  public response:any;
  public message:any;
  public lrResponse:any={};
  public display2 = 'none';
  public isLRStep1 = true;
  public isLRStep2 = false;
  public isLRStep3 = false;
  public isLRStep4 = false;
  public isLRStep5 = false;
  // public isLRStep6 = false;
  lr_id;
  // public newdate = "14-7-18";
  public submitted;
  public submittedstep2;
  public submittedstep3;
  public submittedstep4;
  public submittedstep5;
  public loading_date;
  // resultArray;
  // date = new Date();
  // format: ' hh:mm a';
  date:'h:mm a' ;
   to_pay='0';
  //  advance='0';
  //  balance='0';
  //  to_be_billed_at='0';
  //  loading_unloading='0';
  //  other_charges='0';
  lrform1 = new FormGroup({

    vehicle_number : new FormControl(""),
    loading_date: new FormControl(""),
    out_date: new FormControl(""),
    station_source: new FormControl(""),
    branch_lat:new FormControl(""),
    station_destination: new FormControl(""),
    vehicle_intime:new FormControl(""),
    vehicle_outtime:new FormControl(""),
  });

  lrform2 = new FormGroup({
    consignor_name:new FormControl(""),
    consignor_gstn:new FormControl(""),
    address_line1:new FormControl(""),
    address_line2:new FormControl(""),
    consignee_name:new FormControl(""),
    consignee_gstn:new FormControl(""),
    consignee_address_line1:new FormControl(""),
    consignee_address_line2:new FormControl(""),
    delivery_address:new FormControl(""),
    delivery_contact_number:new FormControl(""),
  })
  lrform3 = new FormGroup({ 
    packages:new FormControl(""),
    goods_description:new FormControl(""),
    actual_weight:new FormControl(""),
    charged_weight:new FormControl(""),
    invoice_number:new FormControl(""),
    invoice_date:new FormControl(""),
    invoice_amount:new FormControl(""),
  })
  lrform4 = new FormGroup({ 
    freight_type:new FormControl(""),
    freight:new FormControl(this.to_pay),
    advance:new FormControl(),
    balance:new FormControl(),
    to_pay:new FormControl(),
    to_be_billed_at:new FormControl(this.to_pay),
    loading_unloading:new FormControl(this.to_pay),
    other_charges:new FormControl(this.to_pay),
  })
  lrform5 = new FormGroup({ 
    length:new FormControl(""),
    width:new FormControl(""),
    height:new FormControl(""),
    policy_number:new FormControl(""),
    amount:new FormControl(""),
    Detention_days_after:new FormControl(""),
    Detention_per_day:new FormControl(""),
    remark:new FormControl(""),
    insurance_company:new FormControl(""),
    detention_charges:new FormControl(""),
    detention_days:new FormControl(""),
    });
  //  vehicle_number: ['', Validators.pattern('^[a-zA-Z \-\']+')]
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
    private newService:MylrService, private route:ActivatedRoute) {
      this.filterArg = new lrCreate();
      this.transporter_id = route.snapshot.params['transporter_id']; 
      console.log(this.transporter_id)
 }

//  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
//       this.newService.lrCreate(this.testData).subscribe( 
//         resultArray =>{ this.lrResponse = resultArray,
//           this.response = this.lrResponse.response;
//           this.message=this.lrResponse.message;
//           this.display2="block";
//           this.imageLoader=false; 
//         })
ngOnInit() {

        let date1 = new Date();
        let date2 = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        
        console.log(date2)
        this.lrform1 = new FormGroup({
          vehicle_number : new FormControl(""),
          loading_date: new FormControl(date1),
          out_date: new FormControl(date1),
          station_source: new FormControl(""),
          branch_lat:new FormControl(""),
          station_destination: new FormControl(""),
          vehicle_intime:new FormControl(date2),
          vehicle_outtime:new FormControl(date2),
        });
        this.lrform3 = new FormGroup({ 
          packages:new FormControl(""),
          goods_description:new FormControl(""),
          actual_weight:new FormControl(""),
          charged_weight:new FormControl(""),
          invoice_number:new FormControl(""),
          invoice_date:new FormControl(date1),
          invoice_amount:new FormControl(""),
          gst_pay_by:new FormControl(""),
        })
        this.lr = new lrCreate()
        let d: Date = new Date();
        this.selDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};

        this.newService.searchConsignorList({'transporter_id':this.transporter_id}).subscribe( resultArray =>{ 
          this.createlrList = resultArray.response.consignor_list;
          this.createlrList2 = resultArray.response.consignee_list;
          this.createlrList3 = resultArray.response.vehicle_list;
          // console.log(this.createlrList2)
          // this.createlrList.consignee_list =this.createlrList,
          // console.log(this.createlrList.consignee_list = this.createlrList);
        })
        // console.log(this.lr.response);
  }

  consignerShow()
{
 
  this.isShow = true;
}  

searchconsignor(name){
 
  // console.log(name)
    this.filterArg.consignor_name = name ;
   
   
    // console.log(this.createlrList2);
    this.obj =  this.createlrList.find(function(v){return v.consignor_name == name});
  
    // console.log(this.obj.consignor_gstn);
    this.filterArg.consignor_gstn = this.obj.consignor_gstn;
    this.filterArg.address_line1  = this.obj.consignor_address;
    this.filterArg.delivery_contact_number=this.obj.delivery_contact_number;
  
    // console.log(this.filterArg.consignor_gstn)
    this.isShow = false;
    let  i =-1;
    for ( i = 0; i < this.createlrList.length; i++) {
      const element = this.createlrList[i];
      // console.log(element)
      if(element.name==name){
        // console.log(element.name)
        break ; 
      }
    }
}


consignerShow1()
{
 
  this.isShow1 = true;
}  
searchconsignor1(name){
  
  // console.log(name)
    
    this.filterArg.consignee_name = name ;
   
   
   
    this.obj1 =  this.createlrList2.find(function(v){return v.consignee_name == name});
    
    this.filterArg.consignee_gstn = this.obj1.consignee_gstn;
    this.filterArg.consignee_address_line1  = this.obj1.consignee_address;
    // console.log(this.filterArg.consignee_gstn)
    this.isShow = false;
    let  i =-1;
    this.isShow1 = false;
    for ( i = 0; i < this.createlrList2.length; i++) {
      const element = this.createlrList2[i];
      // console.log(element)
      if(element.name==name){
        // console.log(element.name)
        break ; 
      }
    }
}


vehicleShow()
{
this.isVehicleList=true;
}

vehicleno(number)
{
console.log(number)
this.filterArg.vehicle_number = number ;
this.obj2 = this.createlrList3.find(function(v){return v.vehicle_number == number});
console.log(this.obj2)
this.filterArg.station_source = this.obj2.station_source;
this.filterArg.station_destination = this.obj2.station_destination;
// console.log(this.filterArg.consignee_gstn)
this.isVehicleList = false;
let i =-1;
for ( i = 0; i < this.createlrList3.length; i++) {
const element = this.createlrList3[i];
// console.log(element)
if(element.number==number){
console.log(element.name)
break ; 
}
}

}
  
activeStep1(){
    this.isLRStep1 = true;
    this.isLRStep2 = false;
    this.isLRStep3 = false;
    this.isLRStep4 = false;
    this.isLRStep5 = false;
  }

  activeStep2(lr2){

    this.submitted = true;
    // console.log(this.lr.vehicle_number=lr2.value.vehicle_number);
    this.loading_date=new Date()
   if(lr2.value.vehicle_number == "" || lr2.value.vehicle_number == undefined){
   
   }
   else if(lr2.value.loading_date == "" || lr2.value.loading_date == undefined){
    
   }
   else if(lr2.value.station_destination == "" || lr2.value.station_destination == undefined){
    
   }
    else if(lr2.value.station_source == "" || lr2.value.station_source == undefined){
     
    }
   else{
    this.lr.vehicle_number=lr2.value.vehicle_number;
    // this.lr.loading_date=lr2.value.loading_date.formatted;
    var form_date = lr2.value.loading_date.jsdate,
    month = '' + (form_date.getMonth() + 1),
    day = '' + form_date.getDate(),
    year = form_date.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var p = [year, month, day].join('-');
    console.log(p)
    this.lr.loading_date=p;

    this.lr.station_destination=lr2.value.station_destination;
    this.lr.station_source=lr2.value.station_source;
    this.lr.vehicle_intime=lr2.value.vehicle_intime;
    this.lr.vehicle_outtime=lr2.value.vehicle_outtime;
    var form_date = lr2.value.out_date.jsdate,
    month = '' + (form_date.getMonth() + 1),
    day = '' + form_date.getDate(),
    year = form_date.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var j = [year, month, day].join('-');
    this.lr.out_date =j;
 
     this.isLRStep1 = false;
    this.isLRStep2 = true;
    this.isLRStep3 = false;
    this.isLRStep4 = false;
    this.isLRStep5 = false;

   }
  }
  activeStep_2(lr2){
    this.isLRStep1 = false;
    this.isLRStep2 = true;
    this.isLRStep3 = false;
    this.isLRStep4 = false;
    this.isLRStep5 = false;
  }
  activeStep3(lr3){
    this.submittedstep2 = true;
     console.log(lr3.value);
     

    if(lr3.value.consignor_name == "" || lr3.value.consignor_name == undefined){
    }
    // else if(lr3.value.consignor_address == "" || lr3.value.consignor_address == undefined){
     
    // }
    // else if(lr3.value.consignee_address == "" || lr3.value.consignee_address == undefined){
     
    // }
    else if(lr3.value.address_line1 == "" || lr3.value.address_line1 == undefined){
     
    }
   
     else if(lr3.value.consignor_gstn == "" || lr3.value.consignor_gstn == undefined){
     
     }
     else if(lr3.value.consignee_name == "" || lr3.value.consignee_name == undefined){
     
    }
    else if(lr3.value.consignee_address_line1 == "" || lr3.value.consignee_address_line1 == undefined){
     
    }
    else if(lr3.value.consignee_gstn == "" || lr3.value.consignee_gstn == undefined){
    
    }
    else if(lr3.value.delivery_address == "" || lr3.value.delivery_address == undefined){
     
    }
   else if((lr3.value.delivery_contact_number != "" || lr3.value.delivery_contact_number != undefined) && lr3.value.delivery_contact_number.length != 10 && lr3.value.delivery_contact_number.length != 0){
       
    }
 
    else{
      this.lr.consignor_name=lr3.value.consignor_name;
      this.lr.address_line1=lr3.value.address_line1;
      this.lr.consignor_gstn=lr3.value.consignor_gstn;
      // this.lr.consignor_address=lr3.value.consignor_address;
      this.lr.consignee_name=lr3.value.consignee_name;
      // this.lr.consignee_address=lr3.value.consignee_address;
      this.lr.consignee_address_line1=lr3.value.consignee_address_line1;
      this.lr.consignee_gstn=lr3.value.consignee_gstn;
      this.lr.delivery_address=lr3.value.delivery_address;
      this.lr.delivery_contact_number=lr3.value.delivery_contact_number;
      if(!lr3.value.delivery_contact_number)
      {
        this.lr.delivery_contact_number=''; 
      }
      // if(lr3.delivery_contact_number){
      //   this.lr.delivery_contact_number = lr3.value.delivery_contact_number;
      // }
      // else{
      //   this.lr.delivery_contact_number=""
      // }

      if(lr3.value.address_line2){
        this.lr.address_line2 = lr3.value.address_line2;
      }
      else{
        this.lr.address_line2 =""
      }
      if(lr3.consignee_address_line2){
        this.lr.consignee_address_line2= lr3.value.consignee_address_line2;
      }
        this.isLRStep1 = false;
        this.isLRStep2 = false;
        this.isLRStep3 = true;
        this.isLRStep4 = false;
        this.isLRStep5 = false;
    }
  }
  activeStep_3(lr3){
    this.isLRStep1 = false;
    this.isLRStep2 = false;
    this.isLRStep3 = true;
    this.isLRStep4 = false;
    this.isLRStep5 = false;
  }
  activeStep4(lr4){
    //  alert()
    this.submittedstep3 = true;
    console.log(lr4)
    const lr = lr4.value
    console.log(lr)
    if(lr.actual_weight < -1 || lr.actual_weight == undefined || lr.actual_weight==''){
     
    }
    else if(lr.packages < -1 || lr.packages == undefined || lr.packages==''){
      
    }
    else if(lr.goods_description <-1 || lr.goods_description == undefined || lr.goods_description==''){
     
    }
    
     else if(lr.charged_weight <-1 || lr.charged_weight == undefined || lr.charged_weight==''){
      
    }
     else if(lr.invoice_number <-1 || lr.invoice_number == undefined || lr.invoice_number==''){
      
    }
    else if(lr.invoice_date <-1|| lr.invoice_date == undefined || lr.invoice_date==''){
      
    }
    else if(lr.invoice_amount <-1 || lr.invoice_amount == undefined || lr.invoice_amount==''){
     
    }
    else if(lr.gst_pay_by==undefined || lr.gst_pay_by=='')
    {
      
    }
    else{
      
      this.lr.packages=lr4.value.packages;
      this.lr.goods_description=lr4.value.goods_description;
      this.lr.actual_weight=lr4.value.actual_weight;
      this.lr.charged_weight=lr4.value.charged_weight;
      this.lr.invoice_number=lr4.value.invoice_number;
      this.lr.invoice_date=lr4.value.invoice_date.formatted;
      var form_date = lr4.value.invoice_date.jsdate,
      month = '' + (form_date.getMonth() + 1),
      day = '' + form_date.getDate(),
      year = form_date.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      var k = [year, month, day].join('-');
      console.log(k)
      this.lr.invoice_date=k;
      this.lr.invoice_amount=lr4.value.invoice_amount;
      this.lr.gst_pay_by=lr4.value.gst_pay_by;
        this.isLRStep1 = false;
        this.isLRStep2 = false;
        this.isLRStep3 = false;
        this.isLRStep4 = true;
        this.isLRStep5 = false;
      }
    }
    activeStep_4(lr4){
     
      this.isLRStep1 = false;
      this.isLRStep2 = false;
      this.isLRStep3 = false;
      this.isLRStep4 = true;
      this.isLRStep5 = false;

    }

  activeStep5(lr5){
   
    this.submittedstep4 = true;
    console.log(lr5.value);
    // this.lr.charge_details.freight=lr5.value.freight;
    // console.log(this.lr.charge_details.freight)
    // this.lr.charge_details.advance=lr5.value.advance;
    if(lr5.value.freight_type == "" || lr5.value.freight_type == undefined){
    }
    else if(lr5.value.freight == "" || lr5.value.freight == undefined){
    }
    else if(lr5.value.advance == undefined ){
      
    }
    else if(lr5.value.balance == undefined ){
      
    }
    else if(lr5.value.to_pay ==undefined){
     
    }
    else if(lr5.value.to_be_billed_at == "" || lr5.value.to_be_billed_at == undefined){
    }
    else{
      if(lr5.value.freight_type == '2'){
        if(lr5.value.to_pay <=0){
            this.topayIsZero=true;
            this.balanceIsZero=false;
         }
         else
         {
          this.topayIsZero=false;
          this.balanceIsZero=false;
          console.log(lr5.value);
          this.lr.freight_type=lr5.value.freight_type;
          this.lr.advance=lr5.value.advance;
          this.lr.balance=lr5.value.balance;
          this.lr.freight=lr5.value.freight;
          this.lr.to_pay=lr5.value.to_pay;
          this.lr.to_be_billed_at=lr5.value.to_be_billed_at;
        
          this.isLRStep1 = false;
          this.isLRStep2 = false;
          this.isLRStep3 = false;
          this.isLRStep4 = false;
          this.isLRStep5 = true;
         }
       }
       else if(lr5.value.freight_type == '1'){ 
         if( lr5.value.balance <=0)
          {
            this.balanceIsZero=true;
            this.topayIsZero=false;
          }
          else{
            this.balanceIsZero=false;
            this.topayIsZero=false;
            console.log(lr5.value);
            this.lr.freight_type=lr5.value.freight_type;
            this.lr.advance=lr5.value.advance;
            this.lr.balance=lr5.value.balance;
            this.lr.freight=lr5.value.freight;
            this.lr.to_pay=lr5.value.to_pay;
            this.lr.to_be_billed_at=lr5.value.to_be_billed_at;
          
            this.isLRStep1 = false;
            this.isLRStep2 = false;
            this.isLRStep3 = false;
            this.isLRStep4 = false;
            this.isLRStep5 = true;
          }
      }
      else{
            this.balanceIsZero=false;
            this.topayIsZero=false;
            console.log(lr5.value);
            this.lr.freight_type=lr5.value.freight_type;
            this.lr.advance=lr5.value.advance;
            this.lr.balance=lr5.value.balance;
            this.lr.freight=lr5.value.freight;
            this.lr.to_pay=lr5.value.to_pay;
            this.lr.to_be_billed_at=lr5.value.to_be_billed_at;
          
            this.isLRStep1 = false;
            this.isLRStep2 = false;
            this.isLRStep3 = false;
            this.isLRStep4 = false;
            this.isLRStep5 = true;
      }
    }
   }
   activeStep13(lr5){
    this.isLRStep1 = false;
     this.isLRStep2 = false;
     this.isLRStep3 = false;
     this.isLRStep4 = false;
     this.isLRStep5 = true;

  }
  

  submit(lr6){
  
    // this.submittedstep5 = true;
    //  console.log(this.lr.value.length = lr6.value.length  );
    // this.testData.length = lr6.value.length;
    // console.log(this.lr.charge_details.freight.value)
    // console.log(this.lr = this.testData);
    // console.log(this.transporter_detail.lr_date);
    // console.log(this.transporter_detail.transporter_id)
    this.lrData.consignor_address=this.lr.address_line1;
    this.lrData.consignee_address=this.lr.consignee_address_line1
    if(this.lr.address_line2){
      this.lrData.consignor_address=this.lr.address_line1+ ',' +this.lr.address_line2;
    }
    else if(this.lr.consignee_address_line2){
      this.lrData.consignee_address=this.lr.consignee_address_line1+','+this.lr.consignee_address_line2;
    }
    // delete this.lr.consignor_address_line1;
    // delete this.lr.consignor_address_line2;
    // delete this.lr.consignee_address_line1;
    // delete this.lr.consignee_address_line2;    
  
    if(lr6.value.length == undefined )
    {
     
      this.lr.value.length='0';
    }
    else{
      this.lr.length=lr6.value.length
    }

    if(lr6.value.width == undefined )
    {
     this.lr.width='0';
    } 
    else{
      this.lr.width=lr6.value.width
    }
    
    if(lr6.value.height == undefined )
    {
     this.lr.height='0';
    } 
    else{
      this.lr.height=lr6.value.height
    }
   
    if(lr6.value.insurance_company == undefined )
    {
     this.lr.insurance_company='0';
    } 
    else{
      this.lr.insurance_company=lr6.value.insurance_company
    }
    if(lr6.value.policy_number == undefined )
    {
     this.lr.policy_number='0';
    }
    else{
      this.lr.policy_number=lr6.value.policy_number
    } 
    if(lr6.value.remark == undefined )
    {
     this.lr.remark='0';
    } 
    else{
      this.lr.remark=lr6.value.remark
    } 
    if(lr6.value.amount == undefined )
    {
     this.lr.amount=0;
    } 
    else{
      this.lr.amount=lr6.value.amount
    } 
    if(lr6.value.detention_days == undefined )
    {
     this.lr.detention_days='0';
    } 
    else{
      this.lr.detention_days=lr6.value.detention_days
    } 
    if(lr6.value.detention_charges == undefined )
    {
     this.lr.detention_charges='0';
    } 
    else{
      this.lr.detention_charges=lr6.value.detention_charges
    } 

    this.imageLoader=true;
    this.testData =  this.lr;
    this.testData.transporter_id=this.transporter_id;
    this.testData.goods_value='0';
    this.testData.gst_to_pay='0';
     this.testData.tbb='0';
    console.log(this.testData)
    this.testData.consignor_address=this.lrData.consignor_address;
    this.testData.consignee_address=this.lrData.consignee_address;  
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.newService.lrCreate(this.testData).subscribe( 
        resultArray =>{ this.lrResponse = resultArray,
          this.response = this.lrResponse.response;
          this.testArray=this.lrResponse.response;
          this.message=this.lrResponse.message;
          this.display2="block";
          this.imageLoader=false; 
        })
        console.log(this.lrResponse)
        // this.newService.searchConsignor(this.testData).subscribe( resultArray =>{ this.createlrList = resultArray})
        // console.log(this.createlrList);
        
        
  }
  // searchconginor(){
  //   this.newService.searchConsignor(this.testData).subscribe( resultArray =>{ this.listbranch = resultArray})
  //   console.log(this.listbranch);
  // }

  
 hidePupUp(){
  
    this.display2="none";
    console.log(this.testArray.lr_id)
    if(this.testArray.template_id==1)
    {
      this.router.navigate(['transporter-lr-detail',this.testArray.lr_id,'1']);
    }
    
    else if(this.testArray.template_id==2)
    {
      this.router.navigate(['transporter-lr-detail',this.testArray.lr_id,'2']);
    }
    else
    {
      this.router.navigate(['transporter-lr-detail',this.testArray.lr_id,'3']);
    }
  }
}
