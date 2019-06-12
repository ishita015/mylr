import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { addtemplate } from './../../../../pages/models/addtemplate';
import { Router } from '@angular/router';
import { MylrService } from './../../../../mylr.service';
@Component({
  selector: 'app-template-4',
  templateUrl: './template-4.component.html',
  styleUrls: ['./template-4.component.css']
})
export class Template4Component implements OnInit {
  transporter_detail:any;
  lrForm;
  submitted:boolean = false;
  display2:string = 'none';
  message:string;
  cookieValue:any;
  imageLoader:boolean = false;
  public lrsuccess:any;
  schemecolor;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  public Form:any
  constructor(private router:Router,private cookieService:CookieService,
    private newService:MylrService) { 

    }


  

  ngOnInit() {
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
     this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
   
     this.transporter_detail=this.cookieValue;
     
     let l_id = this.router.url; 
     l_id =  l_id[l_id.length -1];
     if( l_id != this.transporter_detail.template_id){
       this.router.navigate(['/lr/create', this.transporter_detail.template_id]);
     }

    }
    else{
     this.router.navigate(['/login']);
    }
    this.lrForm = new FormGroup({
      transporter_id: new FormControl(this.cookieValue.transporter_id, Validators.required),
      template_id: new FormControl('4', Validators.required),
      lr_no: new FormControl('', Validators.required),
      pan_no: new FormControl(this.cookieValue.pan_number, Validators.required),
      lr_date: new FormControl('', Validators.required),
      
      consignor: new FormControl('', Validators.required),
      consignor_address: new FormControl('NA', Validators.required),
      consignee: new FormControl('', Validators.required),
      gst_number: new FormControl(this.cookieValue.gst_number),
     
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
     
      packages:new FormControl('', Validators.required),
      goods_details:new FormControl('', Validators.required),

      gst_to_pay_transporter:new FormControl('', Validators.required),
      gst_to_pay_consignor:new FormControl('' , Validators.required),
      gst_to_pay_consignee:new FormControl('', Validators.required),

      actual_weight:new FormControl('', Validators.required),
      charged_weight:new FormControl('', Validators.required),

      balance_freight:new FormControl('', Validators.required),
      
      transporter_name:new FormControl('', Validators.required),
      
      delivery_through:new FormControl('', Validators.required),
      arrival_date:new FormControl('', Validators.required),
      time:new FormControl('', Validators.required),
      no_of_boxes:new FormControl('',  Validators.required),
      remark:new FormControl('',  Validators.required),
      
      freight:new FormControl('', Validators.required),
      
      advance_freight: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      rate_pmt: new FormControl('', Validators.required),
      charge_details: new FormGroup({ 
        rate_pmt: new FormControl('', Validators.required),
        freight: new FormControl('', Validators.required),
        advance_freight: new FormControl('', Validators.required),
        balance_freight: new FormControl('', Validators.required),
        balance: new FormControl('', Validators.required),
        pay_at: new FormControl('', Validators.required)
      //   freight_type: new FormControl('', Validators.required),
      //   actual_freight: new FormControl('', Validators.required),
      //   rate: new FormControl('', Validators.required),
      //   advance : new FormControl('', Validators.required), 
      //   balance: new FormControl('', Validators.required),
      //   to_pay: new FormControl('', Validators.required),
      //   lr_charge: new FormControl('', Validators.required),
      //   loading: new FormControl('', Validators.required),
      //   unloading: new FormControl('', Validators.required),
      //   crossing_charges: new FormControl('', Validators.required),
      //   total_freight: new FormControl('', Validators.required),
      //   amount: new FormControl('')
      })
    })
  }


  submitLr(lrForm){
    console.log(lrForm.value)
    this.submitted = true;
    if(lrForm.value.lr_no=='' || lrForm.value.lr_no == undefined){
        console.log('1')
    }
    else if(lrForm.value.lr_date=='' || lrForm.value.lr_date == undefined){
        console.log('2')
    }
    else if(lrForm.value.from=='' || lrForm.value.from == undefined){
        console.log('3')
    }
    
    else if(lrForm.value.to=='' || lrForm.value.to == undefined){
        console.log('4')
    }
    else if(lrForm.value.consignor=='' || lrForm.value.consignor == undefined){
        console.log('5')
    }
    
    else if(lrForm.value.consignee=='' || lrForm.value.consignee == undefined){
        console.log('6')
    }
    else if(lrForm.value.pan_no=='' || lrForm.value.pan_no == undefined){
        console.log('8')
    }
    else if(lrForm.value.packages=='' || lrForm.value.packages == undefined){
      console.log('9');
    }
    else if(lrForm.value.goods_details=='' || lrForm.value.goods_details == undefined){
      console.log('10');
    }
    else if(lrForm.value.actual_weight=='' || lrForm.value.actual_weight == undefined){
      console.log('11');
    }
    else if(lrForm.value.charged_weight=='' || lrForm.value.charged_weight == undefined){
      console.log('12');
    }
    else if(lrForm.value.gst_to_pay_transporter=='' || lrForm.value.gst_to_pay_transporter== undefined){
      console.log('13');
    }
    else if(lrForm.value.gst_to_pay_consignor=='' || lrForm.value.gst_to_pay_consignor== undefined){
      console.log('14');
    }
    else if(lrForm.value.gst_to_pay_consignee=='' || lrForm.value.gst_to_pay_consignee== undefined){
      console.log('15');
    }
    else if(lrForm.value.rate_pmt == '' || lrForm.value.rate_pmt == undefined){
      console.log('16');
    }
    else if(lrForm.value.delivery_through=='' || lrForm.value.delivery_through== undefined){
      console.log('17');
    }
    else if(lrForm.value.arrival_date == '' || lrForm.value.time == ''){
      console.log('18');
    }
    else if(lrForm.value.no_of_boxes == '' || lrForm.value.remark == ''){
      console.log('19');
    }
    else if(lrForm.value.advance_freight=='' || lrForm.value.charge_details.balance_freight== ''){
      console.log('20');
    }
    else if(lrForm.value.charge_details.pay_at=='' || lrForm.value.balance== ''){
      console.log('21');
    }
    else if(lrForm.value.freight ==''){
      console.log('21');
    }
    else
    {
      this.imageLoader = true;
      lrForm.value.charge_details.rate_pmt = lrForm.value.rate_pmt;

      lrForm.value.charge_details.advance_freight = lrForm.value.advance_freight;
      lrForm.value.charge_details.advance_freight = lrForm.value.advance_freight;

      lrForm.value.pickup_address = lrForm.value.consignor;
      lrForm.value.document_details = [
        {
          "document_type": "document_one",
          "doc_url": "data:image/jpeg;base64,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",
          "remarks": "Document One Image"
        }
      ];
      this.newService.lrCreate(this.lrForm.value).subscribe(resultArray => {
        this.lrsuccess=resultArray;
        this.message = this.lrsuccess.message;
        if(this.lrsuccess.status ==true){
          this.display2="block";
          this.imageLoader = false;
        }
        else{
          this.display2="block";
          this.imageLoader = false;
        }
       
    })
  }
}

hidePop()
  {
  this.display2="none";
                            /* -- Navigate To Template Page -- */
  this.router.navigate(['/lr/list']);
  }
}
