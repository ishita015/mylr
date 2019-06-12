import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MylrService} from './../../mylr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactReq;
  submitted:boolean = false;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  display2='none';
  resultant:any;
  message:string;
  imageLoader:boolean=false;

  constructor(private router:Router, private newService:MylrService) { }

  ngOnInit() {

    this.contactReq = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email_id : new FormControl('', [Validators.pattern
        ('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,4}')]),
      mobile_number: new FormControl('', Validators.pattern(this.mobnumPattern)),
      message: new FormControl('', Validators.required)
    })
    
  }

 


  sendRequest(contactReq){
    console.log(contactReq.value);
    this.submitted = true;
    const email = (<HTMLInputElement>document.getElementById('txtEmail'));
    const filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!filter.test(email.value)) {
    }
    else if(contactReq.value.first_name == '' && contactReq.value.last_name == ''){

    }
    else if(contactReq.value.email_id == '' && contactReq.value.mobile_number == ''){

    }
    else if(this.contactReq.value.mobile_number.length != 10){
      console.log(this.contactReq.value.mobile_number.length);
     
    }
    else if(contactReq.value.message == ''){

    }
    else{
      this.imageLoader = true;
      this.newService.contactRequest(contactReq.value).subscribe(resultArray => {
        this.resultant=resultArray
        this.message = this.resultant.message;
        if(this.resultant.status==true)
        {
          this.display2 = "block";
          this.imageLoader = false;
        }
        else{
          this.display2 = "block";
          this.imageLoader = false;
        }
    })
  }
 }

 hidePop()
  {
  this.display2="none";
  /* -- Navigate To Template Page -- */
  this.router.navigate(['/home']);
  }


}
