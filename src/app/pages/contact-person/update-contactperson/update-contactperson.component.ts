import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
 import {MylrService} from './../../../mylr.service'
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { updatecontactperson } from './../../models/updatecontactperson';
//  import { Observable } from 'rxjs';
 import 'rxjs/add/operator/map'
 import {ActivatedRoute} from '@angular/router';
 import { Router } from '@angular/router';


@Component({

  templateUrl: './update-contactperson.component.html',
  styleUrls: ['./update-contactperson.component.css']
})
export class UpdateContactPersonComponent implements OnInit {
  public listcontactperson: any = {}
  public updatecontactperson:any = {};
  public _Array3: updatecontactperson;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  public uc:any;
  public imageLoader:boolean= false;
  public contactpersonData: updatecontactperson;
  public contact_person_id:string;
  display2='none'
  abcd;
  abc2;
  submitted;
  
  public branch_id:string;
  
  updateForm = new FormGroup({
    contact_person_id: new FormControl(""),
    contact_person_name:new FormControl(""),
    contact_person_mobile:new FormControl(""),
    contact_person_email:new FormControl(""),

});

  constructor(private apiSerivce: MylrService,private route : ActivatedRoute,private router:Router){ 
    this._Array3 = new updatecontactperson()
      this.contact_person_id = route.snapshot.params['contact_person_id']; 
      console.log(this.contact_person_id)
      // this.editcontactperson();
  }
  public updatecontactper(updateForm: NgForm){
    this.uc.updatecontactper(updateForm.value);
  }

  ngOnInit(): void 
  {
    this.imageLoader= true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.apiSerivce.editcontactperson({'contact_person_id':this.contact_person_id}).subscribe( resultArray =>{console.log(this.updatecontactperson = resultArray),  this.imageLoader= false;
         this.updatecontactperson = this.updatecontactperson.response;
          this.updateForm = new FormGroup({
            contact_person_name : new FormControl('',Validators.required),
             contact_person_id: new FormControl(this.contact_person_id,Validators.required),
            contact_person_mobile:new FormControl('',Validators.pattern(this.mobnumPattern)),
            contact_person_email:new FormControl(this.updatecontactperson.email,[Validators.pattern ('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])
          });
        
          console.log(this.updatecontactperson = resultArray.response);
      })
    }

onSubmit(updateForm){
  
  const email = (<HTMLInputElement>document.getElementById('txtEmail'));
  const filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (!filter.test(email.value)) {
   
  }
  else if(this.updateForm.value.contact_person_mobile.length != 10 ){
     
    }
 
   else if(this.updateForm.value.contact_person_name == '' || this.updateForm.value.contact_person_mobile == '' || this.updateForm.value.contact_person_email == '')
  {
   
  }
    else{
    
      this.imageLoader= true;
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.display2="block";
      this.apiSerivce.updatecontactperson(this.updateForm.value).subscribe( resultArray =>{ this._Array3 = resultArray,console.log(this._Array3.message),this.imageLoader= false;});
      this.updateForm.value.contact_person_id = this.contact_person_id; 
    }
   
}

hidePopup(){ 
      this.display2="none";
      this.router.navigate(['contact-person/list-contactperson',this.updatecontactperson.branch_id]);
  }
}
