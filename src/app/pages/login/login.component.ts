import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {MylrService} from '../../mylr.service';
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { add } from '../../../app/pages/models/add';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
submitted : boolean
submitted1:boolean;
cookieValue: any;
display2='none';
display3='none';
display4='none';
display5='none';
display6='none';
display7='none';
confirmDialog='none';
submitted2:boolean;
public isStatus;
email_id;
status;
public ArrayLogin: any;
public forgetArray:any;
public resetArray:any;
public transporter_id:any={};
public isShow:any={}
public imageLoader:boolean = false;
public isShowRetry:any={}
public isTemplateSelected=false;
message:any;
resetEmail;
otp;
newPass;



addForm = new FormGroup({
  email_id: new FormControl(''),
  password: new FormControl('')
});
forgetForm=new FormGroup({
  forget_email_id: new FormControl('')
});
resetForm=new FormGroup({
  email_id: new FormControl(''),
  otp: new FormControl(''),
  new_password: new FormControl(''),
  c_pass: new FormControl('')
});

constructor(private router:Router,private cookieService:CookieService,private newService:MylrService,private MD5: Md5) {
  this.addForm=new FormGroup({
    email_id: new FormControl('', [Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,4}')]),
    password: new FormControl('', Validators.required)
  })
  this.forgetForm=new FormGroup({
    forget_email_id: new FormControl('', [Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,4}')]),
  })
  this.resetForm=new FormGroup({
    email_id: new FormControl('', [Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,4}')]),
    otp: new FormControl('', Validators.required),
    new_password: new FormControl('', Validators.required),
    c_pass:new FormControl('',Validators.required)
  })
}
ngOnInit() {
    // console.log(this.addForm.value.password);
}

onSubmit (){
  this.submitted=true;
  const email = (<HTMLInputElement>document.getElementById('txtEmail'));
  const filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  console.log(this.addForm.value);
  if(!filter.test(email.value))
  {
  }
  else if(this.addForm.value.email_id=='' || this.addForm.value.password=='')
  {
  
  }
  else
  {
    this.addForm.value.password = Md5.hashStr(this.addForm.value.password);
    this.imageLoader = true;
    this.newService.add(this.addForm.value).subscribe(resultArray => {
      this.ArrayLogin=resultArray;
      this.message = this.ArrayLogin.message,
      console.log(this.ArrayLogin.message)
      if(this.ArrayLogin.status==true)
      {
        if(this.ArrayLogin.isEmailVerified==true)
        {
        this.isShowRetry=100;  
        this.imageLoader = false;
        console.log(this.addForm.value);
        this.cookieService.set('loginData',JSON.stringify(this.ArrayLogin.response));
        if(this.cookieService.get('loginData') != '' || this.cookieService.get('loginData') != undefined) {
          this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
          console.log(this.cookieValue);
          if(this.cookieValue.isTemplateAvailable == true){
            this.router.navigate(['/dashboard']);
          }
          else if(this.cookieValue.isTemplateAvailable == false){
            this.router.navigate(['/signup/template']) 

          }
        }
      }
    }
      else
      {
        this.isShowRetry=100;
        this.imageLoader = false;
        this.display2="block";
        this.addForm.controls['password'].patchValue('');
        if(this.ArrayLogin.isEmailVerified==false)
        {
          this.isShowRetry=101;
        }
      }
    })
  }   
} 

hidePop()
{
  this.display2="none";
}
reSend()
{
    this.display2="none";
    this.imageLoader = true;
    this.newService.reSend({'transporter_id':this.ArrayLogin.transporter_id}).subscribe(resultArray => {
    this.ArrayLogin=resultArray;
    this.message = this.ArrayLogin.message;  
    this.imageLoader = false; 
    this.display3="block";
    setTimeout(()=>{
      this.display3="none";
    },3000);

    })
}

forgetSubmit(forgetForm)
{
  this.submitted1=true;
  console.log(forgetForm.value.forget_email_id)
  const filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  console.log(this.addForm.value);
  if(!filter.test(forgetForm.value.forget_email_id))
  {

  }
  else if(forgetForm.value.forget_email_id=='' || forgetForm.value.forget_email_id==undefined)
  {

  }
  else{
  this.email_id=forgetForm.value.forget_email_id;
  this.imageLoader = true;
  this.newService.forgetPass({'email_id':this.email_id}).subscribe(resultArray => {
    this.forgetArray=resultArray;
    this.message = this.forgetArray.message;  
    this.imageLoader = false; 
    this.status=this.forgetArray.status;
    console.log(this.status)
    if(this.status=='true')
    {
      this.isStatus=true;
      this.display5="block";
      this.display4='none';
    }
    else
    {
      this.isStatus=false;
      this.display5="block";
      this.display4='none';
    }
    })
  }
}

forget()
{
  this.display4='block';
}
hideForgetPop()
{
  this.display4='none';
}

hideForgetMsgPop()
{
  this.display5='none';
  console.log(this.isStatus)
  if(this.isStatus==true)
  {
    this.display6='block';
  }
}

resetSubmit(resetForm)
{
  console.log(resetForm.value)
  console.log(this.email_id)
  this.submitted2=true;
  if(resetForm.value.otp=='' || resetForm.value.otp==undefined)
  {
    
  }
  else if(resetForm.value.new_password=='' || resetForm.value.new_password==undefined)
  {
    
  }
  else if(resetForm.value.c_pass=='' || resetForm.value.c_pass==undefined)
  {
    
  }
  else if(resetForm.value.new_password != resetForm.value.c_pass)
  {
    this.confirmDialog="block";
    this.display6="none";
  }
  else{
    this.resetEmail=this.email_id;
    this.otp=resetForm.value.otp;
    this.newPass=Md5.hashStr(resetForm.value.new_password);
    this.imageLoader = true;
    this.newService.resetPass({'email_id':this.resetEmail,'otp':this.otp,'new_password':this.newPass}).subscribe(resultArray => {
      this.resetArray=resultArray;
      this.message = this.resetArray.message;  
      this.imageLoader = false; 
      this.display7="block";
      this.display6="none";
      })
    }
  }

  hideResetPop()
  {
    this.display6="none";
  }
  hideResetMstPop()
  {
    this.display7="none";
  }

  hideConfirmDialog()
  {
    this.confirmDialog="none";
    this.display6="block";
  }

}







