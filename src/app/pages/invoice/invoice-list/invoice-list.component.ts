import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
// import { addFreight } from './../../../../app/pages/models/addfreight';
import { Router } from '@angular/router';
//import { IMyDpOptions } from 'mydatepicker';
import { MylrService } from './../../../mylr.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  public invoiceList:any=[];
  public transporter_detail:any={};
  public showError:any={};
  cookieValue:any;
  invoiceForm;
  submitted:any;
  errors:any;
  imageLoader:any;
  displayError1:any; 
  page;
  consignor;
  public message; 
  public isHide:boolean=false;
  constructor(private router:Router,private cookieService:CookieService, private apiSerivce:MylrService) {
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
    this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
    this.transporter_detail=this.cookieValue;
    this.imageLoader=true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.apiSerivce.invoiceList({"transporter_id":this.transporter_detail.transporter_id}).subscribe( 
      resultArray =>{ this.invoiceList = resultArray;
      console.log(this.invoiceList)
      this.imageLoader=false;
      if(this.invoiceList.status==false)
      {
        this.message=this.invoiceList.message
        console.log(this.message)
        this.isHide=true;
      }
      else
      {
        this.isHide=false;
        this.invoiceList=this.invoiceList.response.invoice_challan_list;
      }
    })
    }
    else{
    this.router.navigate(['/login']);
      }
   }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
     this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
   
     this.transporter_detail=this.cookieValue;
     console.log(this.transporter_detail)
    }
    else{
     this.router.navigate(['/login']);
    }
  }

}
