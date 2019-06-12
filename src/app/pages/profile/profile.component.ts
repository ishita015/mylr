import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
// // Services
// import { FormsService } from './../../services/forms';
// // External
// // import { AngularFireAuth } from 'angularfire2/auth';
// // import { CookieService } from 'ngx-cookie-service';
//  import { CookieService } from 'ngx-cookie-service';
import { CookieService } from 'ngx-cookie-service';
import {MylrService} from '../../mylr.service';
import { Http,Headers,Response, RequestOptions } from '@angular/http';
 import { profile } from '../../../app/pages/models/profile';
 import { profileUpdate } from '../../../app/pages/models/profileupdate';
 import { bankdetails } from '../../../app/pages/models/bankdetails';
 import { updatebankdetails } from '../../../app/pages/models/updatebankdetails';
 import { changepassword } from '../../../app/pages/models/changepassword';
 import { Md5 } from 'ts-md5/dist/md5';
 import { Observable } from 'rxjs';
 import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent{
  submitted;
  profileObj:profile;
  passwordObj:changepassword;
  bankObj:bankdetails;
  cookieValue:any;
  transporter_id:any;
  image_url;
  abc;
  abc1 = true;
  abcd;
  abc2 = true;
  displayadded="none";
  displaybankdetails="none";
  displaypassword="none";
  displaypasswordNot = "none";
  displayconfirmpassword="none";
  abcde;
  abc3 = true;
  public imageLoader:boolean= false;
message;
bankmessage;
status;

  // Personal Profile Data
  public ArrayLogin: profileUpdate;
  addForm = new FormGroup({
    transport_logo: new FormControl(''),
    company_name: new FormControl(''),
    owner_name: new FormControl(''),
    office_number: new FormControl(''),
    contact_number: new FormControl(''),
    country_code: new FormControl(''),
    email_id: new FormControl(''),
    website: new FormControl(''),
    pan_number:new FormControl(''),
    gst_number:new FormControl(''),
 
    
   });

   // Bank Details Data
  public Arraybank: updatebankdetails;
  bankdetail = new FormGroup({
    bank_name:new FormControl(''),
    account_number:new FormControl(''),
    ifsc_code:new FormControl(''),
    
   });

//Change Password Data
   public Arraypassword: changepassword;
   passwordChange = new FormGroup({
     old_password:new FormControl(''),
     new_password:new FormControl(''),
     confirm_password:new FormControl(''),
    });


  constructor(private router:Router,private newService:MylrService,private cookieService:CookieService) {
    this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
    if(this.cookieValue != '' && this.cookieValue != undefined){
      this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
    
      this.transporter_id=this.cookieValue.transporter_id;
     }
     else{
      this.router.navigate(['/login']);
     }
   // const transporter_id = this.cookieValue.response.transporter_id;
    
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.imageLoader= true;
    this.newService.profile({'transporter_id': this.transporter_id}).subscribe(
      resultArray => {
        this.profileObj = resultArray.response;
        this.image_url = this.profileObj.transport_logo;
        this.imageLoader= false;
        console.log( this.profileObj);
      })
 
      this.newService.bankdetails({'transporter_id': this.transporter_id}).subscribe(
        resultArray => {
          this.bankObj = resultArray.response;
          console.log( this.bankObj);
        })
  }
  public cancelEdit(){
    this.abcd = false;
    this.abc2 = true;
  }
  public edit(){
    this.abc = true;
    this.abc1 = false;
  }

  public edit1(){
    this.abcd = true;
    this.abc2 = false;
  }

    // Personal Profile Data update on submit
  onSubmit (){
    this.addForm.value.transporter_id = this.profileObj.transporter_id;
    this.addForm.value.transport_logo = this.image_url;
    this.addForm.value.country_code ="+91";
     if( this.addForm.value.company_name != '' && this.addForm.value.owner_name != '' && this.addForm.value.office_number != '' && this.addForm.value.contact_number != '' && this.addForm.value.country_code != '' && this.addForm.value.email_id != '' && this.addForm.value.website != '' && this.addForm.value.pan_number != '' && this.addForm.value.gst_number != ''){
      this.newService.profileUpdate(this.addForm.value).subscribe(profileObj => {
        this.ArrayLogin=profileObj;
        this.message=this.ArrayLogin.message;
        console.log(this.ArrayLogin);
        if(this.ArrayLogin.status == true){
          this.displayadded ='block';
          console.log( this.addForm.value.transport_logo);
        }
        console.log(this.ArrayLogin); 
    }) 
  }
    }

    // Bank Details Data update on submit
    onSubmitbank (){
      this.bankdetail.value.transporter_id = this.profileObj.transporter_id;
     console.log(this.bankdetail.value.account_number);
     
       if(this.bankdetail.value.bank_name != '' && this.bankdetail.value.account_number != null && this.bankdetail.value.ifsc_code != ''){
      this.imageLoader= true;
        
        this.newService.updatebankdetails(this.bankdetail.value).subscribe(bankObj => {
           this.Arraybank=bankObj;
          this.bankmessage=this.Arraybank.message;
          console.log(this.Arraybank);
        
          if(this.Arraybank.status == true){
            this.displaybankdetails='block';
            this.imageLoader= false;
          }
          console.log(this.Arraybank); 
      }   
        )
      }
    }

    //Change Password Data update on submit
  onSubmitPassword (passwordChange){
    this.submitted=true;
     if(this.passwordChange.value.old_password != '' && this.passwordChange.value.new_password != '' && this.passwordChange.value.confirm_password != ''){
      this.imageLoader= true;
    if(this.passwordChange.value.new_password == this.passwordChange.value.confirm_password){
      this.passwordChange.value.transporter_id = this.profileObj.transporter_id;
      this.passwordChange.value.old_password = Md5.hashStr(this.passwordChange.value.old_password);
      this.passwordChange.value.new_password = Md5.hashStr(this.passwordChange.value.new_password);
      // this.passwordChange.value.confirm_password = Md5.hashStr(this.passwordChange.value.confirm_password);
        this.newService.changepassword(this.passwordChange.value).subscribe(passwordObj => {
          this.Arraypassword=passwordObj;
          console.log(this.Arraypassword.message);
          this.status=this.Arraypassword.status
          this.message = this.Arraypassword.message;
          if(this.status == true){
            this.imageLoader= false;
            this.displayconfirmpassword="block";
         
          }
          else{
            this.imageLoader= false;
            this.displaypasswordNot ='block';
            
          }
          console.log(this.Arraypassword); 
        })
      }
    else{
        this.imageLoader= false;
      this.displaypassword ='block';
    }
    }
  }
 
  changeListener($event): void {
  this.readThis($event.target);
  }
  readThis(inputValue: any): void {
  const file: File = inputValue.files[0];
  const myReader: FileReader = new FileReader();
  myReader.onloadend = (e) => {
  this.image_url = myReader.result;
   console.log(this.image_url);
  };
  myReader.readAsDataURL(file);
  }

  hidePopupadded() {
    this.displayadded = 'none';
    this.displayconfirmpassword="none";
    location.reload();
    // this.router.navigate(['/profile']);
  }

  hidePopupaddedNot() {
    this.displayadded = 'none';
    this.displayconfirmpassword="none";
    this.displaypasswordNot ='none';
    
    // this.router.navigate(['/profile']);
  } 
  hidePopupbank() {
    this.displaybankdetails="none";
    location.reload();
  }
  hidePopuppassword() {
    this.displaypassword = 'none';
  }
  // ngOnInit() {
  // } 
}