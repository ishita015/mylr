import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MylrService } from './../../../mylr.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { add1 } from './../../models/add1';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { consignorList } from '../../models/consignorList';
// import { Key } from 'readline';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
/* -- Declare Class -- */
export class DetailComponent {
  state;
  city;
  cities;
  public imageLoader: boolean = false;
  public isPrev:boolean=false;
  displayError = "none";
  submitted: boolean;
  cookieValue: any;
  imageChangedEvent: any = '';
  display2 = 'none';
  termsCondition='none';
  croppedImage: any = '';
  /* -- Declare pattern of Email  -- */
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  private image: String = "";
  contact_person_details;
  public add1: any = {};
  public isImage: boolean = false;
  public checkboxValue: boolean = false
  // public imageLoader:boolean = false;
  public newState: any;
  resultArray;
  branchLat;
  branchLong;
  branchAddress;
  address;
  message;
  obj: any = {};
  public Array = [];
  public city1: any = {};
  public ArrayLogin: add1;
  display1 = "none";
  displayconfirmpassword1 = "none";
  loadImageFailed;

  addForm = new FormGroup({
    tagline: new FormControl(""),
    transporter_reg_no: new FormControl(""),
    company_name: new FormControl(""),
    owner_name: new FormControl(""),
    office_number: new FormControl(""),
    contact_number: new FormControl(""),
    password: new FormControl(""),
    transport_logo: new FormControl(""),
    branch_name: new FormControl(""),
    address: new FormControl(""),
    website: new FormControl(""),
    pan_number: new FormControl(""),
    gst_number: new FormControl(""),
    email_id: new FormControl(""),
    branch_lat: new FormControl(""),
    branch_long: new FormControl(""),
    city: new FormControl(""),
    state: new FormControl(""),
    role_id: new FormControl("2"),
    checkboxValue: new FormControl("false"),
  });
  /* -- Declare Function of Latitude & Longitute  -- */
  autoCompleteCallback1(selectedData: any) {
    const result = selectedData.data;
    this.branchLat = selectedData.data.geometry.location.lat;
    this.branchLong = selectedData.data.geometry.location.lng;
    this.branchAddress = selectedData.data.formatted_address;
    this.displayError = "none";
    console.log(result);
    if (result) {
      // this.city = result.address_components[0].long_name;
      // this.state = result.address_components[2].long_name;
      console.log(this.state);
      // document.getElementById('state').nodeValue = result.address_components[2].long_name;;
      console.log(document.getElementById('state').nodeValue);
      let postalCode = result.address_components.find(function (component) {
        return component.types[0] == "postal_code";
      });
      // document.getElementById('post_code').value = postalCode.long_name;

      let town = result.address_components.find(function (component) {
        return component.types[0] == "administrative_area_level_2";
      });
      this.city = town.long_name;
      console.log(this.city);
      // document.getElementById('town').value = town.long_name;

      let country = result.address_components.find(function (component) {
        return component.types[0] == "country";
      });
      // document.getElementById('country').value = country.long_name;

      let state = result.address_components.find(function (component) {
        return component.types[0] == "administrative_area_level_1";
      });
      this.state = state.long_name;
      console.log(this.state);
      // document.getElementById('state').value = state.long_name;

      let lane1 = result.address_components.find(function (component) {
        return component.types[0] == "sublocality_level_1";
      });
      // document.getElementById('lane1').value = lane1.long_name;

      let lane2 = result.address_components.find(function (component) {
        return component.types[0] == "sublocality_level_2";
      });
      // document.getElementById('lane2').value = lane2.long_name;

      // console.log(postalCode.long_name);


    } else {
      window.alert('No results found');
    }

  }
  /* -- Declare Constructor -- */
  constructor(private router: Router, private cookieService: CookieService,
    private newService: MylrService) {

  }


  state1() {
    //   alert("sign")
    //   this.newService.getstate({}).subscribe(resultArray => {
    //   this.ArrayLogin=resultArray;
    //    var key = [];

    //       for(let Array in resultArray){
    //         key.push(Array);
    //       }

    //    console.log(key);
    //   console.log(this.ArrayLogin);
    // }) 
  }
  getcity(state) {
    // alert(state)
    this.newService.getstate({}).subscribe(resultArray => {
      this.ArrayLogin = resultArray;
      this.cities = this.ArrayLogin[state];
      console.log(this.cities)
    })
  }


  ngOnInit() {

    // alert("sign")
    this.newService.getstate({}).subscribe(resultArray => {
      this.ArrayLogin = resultArray;

      for (let state in resultArray) {
        this.Array.push(state);
      }

      console.log(resultArray);
      console.log(this.ArrayLogin);
    })

    this.addForm = new FormGroup({
      /* -- Add Validation  In FormControl  -- */

      transporter_reg_no: new FormControl('', Validators.required),
      tagline: new FormControl(''),
      company_name: new FormControl('', Validators.required),
      owner_name: new FormControl('', Validators.required),
      office_number: new FormControl('', Validators.pattern(this.mobnumPattern)),
      contact_number: new FormControl('', Validators.pattern(this.mobnumPattern)),
      email_id: new FormControl('', [Validators.pattern
        ('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,4}')]),
      password: new FormControl('', Validators.required),
      branch_name: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      pan_number: new FormControl('', Validators.required),
      gst_number: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      transport_logo: new FormControl('', Validators.required),
      checkboxValue: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    })

    this.addForm.controls['state'].valueChanges.subscribe(
      (selectedValue) => {
        console.log(selectedValue);
        this.getcity(selectedValue)
      }
    );
  }
  /* -- Submit Function -- */
  onSubmit(addForm) {
    this.submitted = true;
    const email = (<HTMLInputElement>document.getElementById('txtEmail'));
    const filter = /^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,4}$/;
    if (this.addForm.value.address == undefined || this.addForm.value.address == '') {
      this.displayError = "block";
     
    }


    /* -- Add Validation  -- */

    /* -- Add Image  -- */
    this.addForm.value.transport_logo = this.croppedImage;
    if (this.addForm.value.transport_logo == '') {
      this.isImage = true
      
    }
    else if (this.addForm.value.company_name == '' || this.addForm.value.pan_number == ''
      || this.addForm.value.owner_name == '' || this.addForm.value.office_number == ''
      || this.addForm.value.contact_number == '' || this.addForm.value.email_id == ''
      || this.addForm.value.password == '' || this.addForm.value.transporter_reg_no == '') {
      this.isImage = false
      
    }
    else if (this.addForm.value.contact_number.length != 10) {
      
    }
    else if (this.addForm.value.branch_name == '') {
      
    }

    else if (this.addForm.value.office_number.length != 10) {
     
    }
    else if (!filter.test(email.value)) {
      
    }
    else if (this.addForm.value.checkboxValue == false) {
     
    }
    else {
      
      this.addForm.value.password = Md5.hashStr(this.addForm.value.password);
      this.imageLoader = true;
      this.isImage = false;
      this.addForm.value.branch_lat = 0;
      this.addForm.value.branch_long = 0;
    
      this.submitted = true;
      //  this.addForm.value.address = '111';
      //  this.addForm.value.branch_contact = '111';
      //  this.addForm.value.city = this.city;
      this.addForm.value.country_code = '+91';

    
      /* -- Add services -- */
      this.newService.add1(this.addForm.value).subscribe(resultArray => {
        this.ArrayLogin = resultArray;
        this.message = this.ArrayLogin.message
        /* -- Add Cookies & Popup Display Code -- */
        if (this.ArrayLogin.status == true) {
          this.cookieService.set('signupData', JSON.stringify(this.ArrayLogin.response));
          console.log(this.addForm.value);
          if (this.cookieService.get('signupData') != '' || this.cookieService.get('signupData') !=
            undefined) {
            this.imageLoader = false;
            this.cookieValue = this.cookieService.get('signupData');

            console.log(this.cookieValue);
            this.display2 = "block";
          }
        }
        else {
          /* -- Popup Display Code -- */
          this.displayconfirmpassword1 = "block";
          this.imageLoader = false;
        }
      })

    }
  }
 /* -- Image preview Code -- */
  
 changeListener($event) : void 
 {
   this.imageChangedEvent = $event;    
   this.readThis($event.target);
   this.isImage = false
   this.isPrev=true;
 }
 imageCropped(image: string) {
   this.croppedImage = image;
}
 readThis(inputValue: any): void 
 {
   var file:File = inputValue.files[0];
   var myReader:FileReader = new FileReader();
   myReader.onloadend = (e) => {
      this.image = myReader.result;
   }
   myReader.readAsDataURL(file);
 }


  /* -- Popup Function Code -- */
  hidePop() {
    this.display2 = "none";
    /* -- Navigate To Template Page -- */
    this.router.navigate(['/login']);
  }

  hidePopupadded1() {

    this.displayconfirmpassword1 = 'none';
    this.imageLoader = false;

    // this.router.navigate(['/profile']);
  }

  openTerms()
  {
    this.termsCondition='block';
  }
  closeTerms()
  {
    this.termsCondition='none';
  }

}
