import { Component, OnInit } from '@angular/core';
import {MylrService} from './../../../mylr.service'
import { FormBuilder,FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { addbranch } from './../../models/addbranch';
import { CookieService } from 'ngx-cookie-service';
import { Console } from '@angular/core/src/console';

@Component({
  
  templateUrl: 'add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  public count =0;
  public transporterAdd:any = {};
  submitted : boolean;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  branchLat;
  public imageLoader:boolean= false;
  cookieValue: any;
  response: any;
  branchLong;
  branchAddress;
  formBuilder;
  orderForm;
  name;
  email;
  mobile;
  message;
  public addcontactperson:any = {};
  display2='none'
  display='none'
  transporter_id:any;
  state;
  city;
  displayError="none";
  salesListArray:FormArray;
  public resultantArray1: addbranch;
  public contact_person_details:Array<{"name":string,"email":string,"mobile":string}>
  addForm = new FormGroup({
    transporter_id : new FormControl(""),
    branch_name: new FormControl(""),
    branch_mail: new FormControl("", [Validators.pattern
      ('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
    branch_contact:new FormControl('',[Validators.pattern(this.mobnumPattern)]),
    branch_address: new FormControl(""),
    branch_lat:new FormControl(""),
    branch_long: new FormControl(""),
    city:new FormControl(""),
    state:new FormControl(""),
    contact_person_details:new FormControl(""),
});



autoCompleteCallback1(selectedData: any) {
  // do any necessery stuff.
  const result = selectedData.data;
  this.branchLat = selectedData.data.geometry.location.lat;
  this.branchLong = selectedData.data.geometry.location.lng;
  this.branchAddress = selectedData.data.formatted_address;
  this.displayError="none";
  console.log(selectedData);
  console.log(result);
        if (result) {
          // this.city = result.address_components[0].long_name;
          // this.state = result.address_components[2].long_name;
              console.log(this.state);
             // document.getElementById('state').nodeValue = result.address_components[2].long_name;;
              console.log(document.getElementById('state').nodeValue);
              let postalCode = result.address_components.find(function(component) {
                  return component.types[0] == "postal_code";
              });
              // document.getElementById('post_code').value = postalCode.long_name;
          
              let town = result.address_components.find(function(component) {
                  return component.types[0] == "administrative_area_level_2";
              });
              this.city =town.long_name;
              console.log(this.city);
              // document.getElementById('town').value = town.long_name;
          
              let country = result.address_components.find(function(component) {
                  return component.types[0] == "country";
              });
              // document.getElementById('country').value = country.long_name;
          
              let state = result.address_components.find(function(component) {
                  return component.types[0] == "administrative_area_level_1";
              });
              this.state=state.long_name;
              console.log(this.state);
              // document.getElementById('state').value = state.long_name;
          
              let lane1 = result.address_components.find(function(component) {
                  return component.types[0] == "sublocality_level_1";
              });
              // document.getElementById('lane1').value = lane1.long_name;
          
              let lane2 = result.address_components.find(function(component) {
                  return component.types[0] == "sublocality_level_2";
              });
              // document.getElementById('lane2').value = lane2.long_name;
          
              // console.log(postalCode.long_name);
          
          
          } else {
              window.alert('No results found');
          }
}


constructor(private apiSerivce: MylrService,private cookieService:CookieService) {
  this.contact_person_details = [];
  this.contact_person_details.push({"name":"","email":"","mobile":""})
 
}
  ngOnInit() {
    if(this.cookieService.get('loginData'))
    {
     this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
     console.log( this.cookieValue )
    // this.transporter_id = this.cookieValue.response.transporter_id;
    } 
  }
  onSubmit(){
  
    this.submitted=true;
    console.log(this.addForm.value)

    this.addForm.value.branch_lat = this.branchLat;
    this.addForm.value.branch_long = this.branchLong;
    this.addForm.value.branch_address = this.branchAddress;
    this.addForm.value.city = this.city;
    this.addForm.value.state= this.state;
    this.addForm.value.contact_person_details = this.contact_person_details;  
    // console.log(this.addForm.value)
    if(this.cookieService.get('loginData'))
    {
     this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
    //  console.log( this.cookieValue )
     this.addForm.value.transporter_id = this.cookieValue.transporter_id;
    } 

    if ( this.contact_person_details.length == 1){
     
      if(this.contact_person_details[0].name =='' && this.contact_person_details[0].email == '' && this.contact_person_details[0].mobile == ''){
        
        this.displayError="block";
      }
      else{
        this.displayError="none";
      }
      }
      if(this.addForm.value.branch_address  == undefined)
      {
        this.displayError="block";
      }
      else{
        this.displayError="none"; 
      }

    if (this.addForm.value.branch_name != undefined 
      && this.addForm.value.branch_contact != undefined 
      && this.addForm.value.branch_mail != undefined
      && this.addForm.value.branch_address != undefined && 
      this.contact_person_details[0].name !='' && this.contact_person_details[0].email != '' && this.contact_person_details[0].mobile != ''
    ){
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.imageLoader= true;
      this.apiSerivce.addbranch(this.addForm.value).subscribe( resultArray =>{ 
      (this.resultantArray1 = resultArray);
      this.message = this.resultantArray1.message; 
      this.imageLoader= false;
      
      console.log(this.message); 

      this.display2="block";
    
     
    })
  }
   
}
  public addContact(){
    if(this.count>1){
  
    }else{
      this.contact_person_details.push({"name":"","email":"","mobile":""})
      this.count++;
    }
  }
  public deleteContact(i){
    this.count--;
    this.contact_person_details.splice(i,1)
  }
  hidePopup()
   { 
   
      this.display2="none";
      this.imageLoader= false; 
      location.reload();
    }
  
  
}
