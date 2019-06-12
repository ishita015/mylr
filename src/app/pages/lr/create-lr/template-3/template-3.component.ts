import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import {MylrService} from '../../../../mylr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LrTemplate2 } from '../../../models/lr-template2';
import { charge_details } from '../../../models/lr-template2';

@Component({
  selector: 'app-template-3',
  templateUrl: './template-3.component.html',
  styleUrls: ['./template-3.component.css']
})
export class Template3Component implements OnInit {
  LrTemplate2;
  
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
      
       let l_id = this.router.url; 
       l_id =  l_id[l_id.length -1];
       if( l_id != this.transporter_detail.template_id){
         this.router.navigate(['/lr/create', this.transporter_detail.template_id]);
       }
      }
      else{
       this.router.navigate(['/login']);
      }
    }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('loginData');
    console.log(this.cookieValue);

    this.lrForm = new FormGroup({
     // transporter_id: new FormControl('1', Validators.required),
      template_id: new FormControl('3', Validators.required),
      consignment_note_number: new FormControl('', Validators.required),
      consignment_note_number_date: new FormControl('', Validators.required),
      consignor_name: new FormControl('', Validators.required),
      consignor_address: new FormControl('', Validators.required),
      consignee_name: new FormControl('', Validators.required),
      consignee_address: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      in_time: new FormControl('', Validators.required),
      out_time: new FormControl('', Validators.required),
      consignment_date: new FormControl('', Validators.required),
      packages: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      actual_weight: new FormControl('', Validators.required),
      charged_weight: new FormControl('', Validators.required),
      invoice_date: new FormControl('', Validators.required),
      invoice_number: new FormControl('', Validators.required),
      gst_number: new FormControl('', Validators.required),
      eway_bill_number: new FormControl('', Validators.required),
      vehicle_number: new FormControl('', Validators.required),
      driver_license_no: new FormControl('', Validators.required),
      driver_contact_no: new FormControl('', Validators.required),
      
      charge_details: new FormGroup({ 
        total_freight: new FormControl('', Validators.required),
        advance_freight: new FormControl('', Validators.required),
        balance_freight: new FormControl('', Validators.required),
        to_pay: new FormControl('', Validators.required),
        tbb: new FormControl('', Validators.required),
      })

    })
    
  }
  
 
         

  
  submitLr(lrForm){
    console.log(lrForm.value);
    this.submitted = true;

      this.lrForm.value.charge_details.demarges_chargeable =  this.lrForm.value.demarges_chargeable;
      delete this.lrForm.value.demarges_chargeable;
      
      this.lrForm.value.transporter_id = this.transporter_detail.transporter_id;
    
    if(this.lrForm.value.consignment_note_number !== '' && this.lrForm.value.from 
      && this.lrForm.value.consignment_note_number_date !== '' 
    && this.lrForm.value.consignor_name !== '' && this.lrForm.value.consignor_address !== '' 
    && this.lrForm.value.consignee_name !== '' && this.lrForm.value.consignee_address !== '' 
    && this.lrForm.value.to !== '' && this.lrForm.value.in_time !== ''
     && this.lrForm.value.out_time !== '' && this.lrForm.value.consignment_date !== '' && this.lrForm.value.packages !== '' 
     && this.lrForm.value.description !== '' && this.lrForm.value.actual_weight !== '' 
     && this.lrForm.value.charged_weight !== '' && this.lrForm.value.invoice_date !== '' 
     && this.lrForm.value.invoice_number !== '' && this.lrForm.value.gst_number !== '' && this.lrForm.value.eway_bill_number !== ''
     && this.lrForm.value.vehicle_number !== '' && this.lrForm.value.driver_license_no !== '' && this.lrForm.value.driver_contact_no !== ''
     && this.lrForm.value.charge_details.total_freight !== '' && this.lrForm.value.charge_details.advance_freight !== ''
     && this.lrForm.value.charge_details.balance_freight !== '' && this.lrForm.value.charge_details.to_pay !== ''  
     && this.lrForm.value.charge_details.tbb !== '' && this.lrForm.value.driver_contact_no.length === 10){
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
