import { Component, OnInit } from '@angular/core';
import {MylrService} from './../../../mylr.service'
import { FormBuilder,FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { addbranch } from './../../models/addbranch';
import { CookieService } from 'ngx-cookie-service';
import { addcontactperson } from '../../models/addcontactperson';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
@Component({
  templateUrl: './add-contactperson.component.html',
  styleUrls: ['./add-contactperson.component.css']
})
export class AddContactPersonComponent implements OnInit {
    submitted : boolean;
    public listcontactperson: any = {};
    public addcontactperson:any = {};
    branch_id;
    public imageLoader:boolean= false;
    display2='none'
    display='none'
    message;
    page;
    public resultantArray1: addcontactperson;
    mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
    addForm = new FormGroup({
        branch_id : new FormControl(""),
        contact_person_name: new FormControl(""),
        contact_person_mobile: new FormControl(""),
        contact_person_email: new FormControl(""),
    });
    
 constructor(private apiSerivce: MylrService,private route : ActivatedRoute,private cookieService:CookieService,private router:Router) {
  this.branch_id= route.snapshot.params['branch_id']; 
  console.log(this.branch_id)
  }
 ngOnInit(): void 
    {
     
      this.apiSerivce.listcontactperson({'branch_id':this.branch_id}).subscribe( resultArray =>{ this.listcontactperson = resultArray})
     console.log(this.listcontactperson);
      this.addForm = new FormGroup
      ({
        contact_person_name : new FormControl("",Validators.required),
        contact_person_mobile: new FormControl('',Validators.pattern(this.mobnumPattern)),
        contact_person_email: new FormControl('', [Validators.pattern
            ('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      });
    }
  onSubmit(addForm){
  this.submitted = true;
    
  // alert('12');
  const email = (<HTMLInputElement>document.getElementById('txtEmail'));
  const filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (!filter.test(email.value)) {
    // alert('aman');
  }
  
  else if(this.addForm.value.contact_person_name == '' || this.addForm.value.contact_person_mobile == '' || this.addForm.value.contact_person_email == '')
  {
    // alert('122');
  }
  
  else if(this.addForm.value.contact_person_mobile.length != 10 ){
 
    }
  
  

    else{
  //  alert('1');
    // this.addForm.value.branch_id = 8;
    this.addForm.value.branch_id = this.branch_id 
    this.imageLoader= true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
   
    this.apiSerivce.addcontactperson(this.addForm.value).subscribe( resultArray =>{ this.resultantArray1 = resultArray, this.imageLoader= false;
      this.message = this.resultantArray1.message; 
      this.display2="block";
    })
    this.apiSerivce.addcontactperson(this.resultantArray1);
    console.log(this.resultantArray1= this.addForm.value);
  }
}
hidePopup()

   { 
      this.display2="none";
      this.router.navigate(['contact-person/list-contactperson',this.branch_id]);
   }
  

}
