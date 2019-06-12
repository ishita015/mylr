import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MylrService} from './../../../mylr.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.css']
})
export class VoucherDetailComponent implements OnInit {
  voucher_id:string;
  voucher_detail:any;
  cookieValue:any; 
  transporter_detail:any;

  constructor(private apiSerivce: MylrService, private router : Router, 
    private cookieService:CookieService, private route: ActivatedRoute) {

     }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
     this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
     this.transporter_detail=this.cookieValue;
  }
  else{
    this.router.navigate(['/login']);
   }
    this.voucher_id = this.route.snapshot.paramMap.get('voucher_id');
  
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //this.imageLoader = true;
    this.apiSerivce.voucherDetail({"voucher_id":this.voucher_id}).subscribe( 
        resultArray =>{ 
         this.voucher_detail = resultArray.response;
         console.log(this.voucher_detail);
      })
    }

    printDetail(printSectionId: string) {
      let popupWinindow
      const innerContents = document.getElementById(printSectionId).innerHTML;
      popupWinindow = window.
          open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.
          write('<html><head></head><body onload="window.print()">' +
              innerContents + '</html>');
      popupWinindow.document.close();
  }

}
