import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import {MylrService} from './../../../../mylr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { lrtemplate6 } from '../../../models/lr-template6';
import { charge_details } from '../../../models/lr-template6';

@Component({
  selector: 'app-template-6',
  templateUrl: './template-6.component.html',
  styleUrls: ['./template-6.component.css']
})
export class Template6Component implements OnInit {
  LrTemplate5;
  
  lrForm;
  display2 = 'none';
  submitted: boolean = false;
  message: string;

  lrsuccess: any;
  imageLoader: boolean = false;

  cookieValue: any;
  transporter_detail:any;

  constructor(private router:Router,private cookieService:CookieService,
    private newService:MylrService) { 
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
    
    
    this.lrForm = new FormGroup({
      transporter_id: new FormControl('', Validators.required),
      template_id: new FormControl('6', Validators.required),
      lr_no: new FormControl('', Validators.required),
      vehicle_number: new FormControl('', Validators.required),
      consignor: new FormControl('', Validators.required),
      consignee: new FormControl('', Validators.required),
      lr_date: new FormControl('', Validators.required),
      packages: new FormControl('', Validators.required),
      particular: new FormControl('', Validators.required),
      actual_weight: new FormControl('', Validators.required),
      invoice_number: new FormControl('', Validators.required),
      invoice_amount: new FormControl('', Validators.required),
      consignor_address: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),

      charge_details: new FormGroup({ 
        packages: new FormControl('', Validators.required),
        particular: new FormControl('', Validators.required),
        actual_weight: new FormControl('', Validators.required),
        rate_pmt: new FormControl('', Validators.required),
        total_freight: new FormControl('', Validators.required),
        balance_freight: new FormControl('', Validators.required),
        pay_at: new FormControl('', Validators.required),
      })

    })
    this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
   console.log( this.cookieValue.transporter_id)
  }
  
 
  submitLr(lrForm){
    console.log(lrForm.value);
    this.submitted = true;
    this.lrForm.value.transporter_id=this.cookieValue.transporter_id;
    this.lrForm.value.packages =  this.lrForm.value.charge_details.packages;
    console.log(this.lrForm.value.packages);
    delete this.lrForm.value.charge_details.packages;

      this.lrForm.value.particular =  this.lrForm.value.charge_details.particular;
      delete this.lrForm.value.charge_details.particular;

      this.lrForm.value.actual_weight =  this.lrForm.value.charge_details.actual_weight;
      delete this.lrForm.value.charge_details.actual_weight;
    
    if(this.lrForm.value.lr_no !== '' && this.lrForm.value.consignor !== '' && this.lrForm.value.consignee !== '' 
      && this.lrForm.value.lr_date !== ''  && this.lrForm.value.vehicle_number !== '' 
    && this.lrForm.value.from !== '' && this.lrForm.value.to !== '' 
   &&  this.lrForm.value.packages !=='' && this.lrForm.value.particular !== '' 
    &&  this.lrForm.value.actual_weight !== '' && this.lrForm.value.invoice_number !== ''
    && this.lrForm.value.invoice_amount !== '' && this.lrForm.value.consignor_address !== ''
     && this.lrForm.value.charge_details.rate_pmt !== '' && this.lrForm.value.charge_details.total_freight !== ''  
     && this.lrForm.value.charge_details.balance_freight !== '' && this.lrForm.value.charge_details.pay_at !== '')
     {
      this.newService.lrCreate(this.lrForm.value).subscribe(resultArray => {
        this.lrsuccess = resultArray;
        console.log(this.message);
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
//   let files = [].slice.call(event.target.files);

//   input.value = files.map(f => f.name).join(', ');

//   console.log(input.value)
// }
 }
onChanaage(event) {
  
  if(event.target.files && event.target.files.length > 0) {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    console.log(reader.result);
    // reader.onload = () => {
    //   this.form.get('avatar').setValue({
    //     filename: file.name,
    //     filetype: file.type,
    //     value: reader.result.split(',')[1]
    //   })
    };
  }


  hidePop() {
  this.display2 = 'none';
  this.router.navigate(['/lr/list']);
  }

}
