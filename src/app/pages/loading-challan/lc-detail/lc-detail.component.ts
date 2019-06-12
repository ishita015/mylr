import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MylrService} from './../../../mylr.service';
import { CookieService } from 'ngx-cookie-service';
import * as jsPDF from 'jspdf'
import * as  html2canvas from 'html2canvas';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { loadingChallanDetail } from './../../models/loading-challan-detail'

@Component({
  selector: 'app-lc-detail',
  templateUrl: './lc-detail.component.html',
  styleUrls: ['./lc-detail.component.css']
})
export class LcDetailComponent implements OnInit {
  public base64;
  displaypdf = 'none';
  displaymessage = 'none';
  loading_challan_id:any;
  submitted;
  public loadingChallanDetail:any = {};
  public imageLoader:boolean=false;
  cookieValue:any;
  transporter_detail:any;
  freight_type;
  sum2;
  branch_name;
  public isShow=false;
  sum3;
  date_of_loading;
  lr_date;
  public pdfDataUrl;
  public base64Img;
  lrsuccess;
  message;

  pdfForm = new FormGroup({
   mobile_number: new FormControl(''),
   email_id: new FormControl('', [Validators.pattern
     ('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
   file: new FormControl(''),
   lr_id: new FormControl('')
 });
 
  constructor(private router:Router,private newService:MylrService,private cookieService:CookieService, private route: ActivatedRoute, private datepipe : DatePipe) {
      this.loadingChallanDetail=new loadingChallanDetail()
  }
    
  ngOnInit() {
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
      this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
      this.transporter_detail=this.cookieValue;

      this.loading_challan_id = this.route.snapshot.params['loading_challan_id'];
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.imageLoader = true;     
      this.newService.loadingChallanDetail({'loading_challan_id': this.loading_challan_id }).subscribe(
        resultArray => {
         this.loadingChallanDetail = resultArray.response;
          this.imageLoader = false; 
          console.log(this.loadingChallanDetail)
         // this.lr_date =this.datepipe.transform(this.loadingChallanDetail.lr_date, 'dd-MM-yyyy');
          
          this.sum2 = 0;
          this.sum3 = 0;
          this.loadingChallanDetail.loading_challan_detail.forEach(obj =>{
         
            this.sum2 += parseInt(obj.weight);
         
            this.sum3 += parseInt(obj.amount);
            if(obj.freight_type==1 || obj.freight_type==5)
            {
                this.isShow=true;
            }
           })
           console.log(this.loadingChallanDetail.transporter_details.transport_logo)
          const self = this;
          const xhr = new XMLHttpRequest()
          xhr.open("GET", this.loadingChallanDetail.transporter_details.transport_logo);
          xhr.responseType = "blob";
          xhr.send();
          xhr.addEventListener("load", function() {
              var reader = new FileReader();
              reader.readAsDataURL(xhr.response); 
              reader.addEventListener("loadend", function() {             
                  self.base64Img = reader.result;
                  document.getElementById('imageDiv').innerHTML = '<img width="100px" src="' + self.base64Img + '"/>';                  
              });     
          });
        })
    }
    else{
      this.router.navigate(['/login']);
     }


  }

    printDetail(printSectionId: string) {
      let popupWinindow
      const innerContents = document.getElementById('print-section').innerHTML;
      popupWinindow = window.
          open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.
          write('<html><head></head><body onload="window.print()">' +
              innerContents + '</html>');
      popupWinindow.document.close();
  }

/*============================= Generate PDF =================================*/
generatePdf() {
  var source = document.getElementById('print-section').innerHTML;
  console.log(source);
  
  var options = { background: '#fff' };
  try {
    html2canvas(document.querySelector("#print-section"),{
      width: 1200,
      height: 1500
    }).then(canvas => {
      // console.log(canvas.toDataURL())
     var pdf = new jsPDF('p','pt','a3');
     pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 15, 20);
     this.base64 = pdf.output('datauri');
    // pdf.save('asdsa')
    //  console.log(this.base64);
    this.displaypdf = 'block';
     });
  }catch( e) {
  
  }
  }

/*============================= Share PDF =================================*/
sharePdf(){
  this.submitted=true;
  this.pdfForm.value.file = this.base64;
  this.pdfForm.value.loading_challan_id  = this.loading_challan_id;
  const filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  // console.log(this.pdfForm.value.email_id)
  if(!filter.test(this.pdfForm.value.email_id))
  {
    
  }
  else if(this.pdfForm.value.email_id != '') {
  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  this.imageLoader = true;
  this.newService.shareLc(this.pdfForm.value).subscribe(resultArray => {
    this.lrsuccess = resultArray;
 
    this.message = this.lrsuccess.message;
    if(this.lrsuccess.status = true){
      this.imageLoader = false;
      this.displaypdf = 'none';
    }
    this.imageLoader = false;
    this.displaymessage = 'block';
  });
}
}
/*============================= Hide PDF popup =================================*/
hidePopup(){
  this.displaypdf = 'none';
  this.displaymessage = 'none';
}

}
