import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MylrService} from './../../../../mylr.service';
import { CookieService } from 'ngx-cookie-service';

import * as jsPDF from 'jspdf';
import * as  html2canvas from 'html2canvas';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-2',
  templateUrl: './detail-2.component.html',
  styleUrls: ['./detail-2.component.css']
})
export class Detail2Component implements OnInit {

/*=================== Pdf Share Form =========================*/
public base64;
displaypdf = 'none';
displaymessage = 'none';
lrsuccess;
public total_frgt_amnt:any=0;
message;
submitted;
consignorDialog='none';
consigneeDialog='none';
driverDialog='none';
cosigneeDisplayHtml='none';
driverDisplayHtml='none';
cosignorDisplayHtml='block';
name:string;
base64Img:string;
public printArray=[];
pdfForm = new FormGroup({
 mobile_number: new FormControl(''),
 email_id: new FormControl('', [Validators.pattern
  ('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
 file: new FormControl(''),
 lr_id: new FormControl('')
});


  public lrDetail: any = {};
  public lr_id:string;
  cookieValue:any;
  transporter_detail:any;
  imageLoader = false;
  public lr_charges;
  constructor(private apiSerivce: MylrService,private router : Router, private cookieService:CookieService, private route: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.lr_id = this.route.snapshot.paramMap.get('lr_id');
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
     this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
   
     this.transporter_detail=this.cookieValue;
     console.log(this.transporter_detail)
    
     let l_id = this.router.url; 
     l_id =  l_id[l_id.length -1];
     if( l_id != this.transporter_detail.template_id){
       this.router.navigate(['/lr/detail', this.lr_id, this.transporter_detail.template_id]);
     }

    }
    else{
     this.router.navigate(['/login']);
    }

  
    this.imageLoader=true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.apiSerivce.lrDetail({"lr_id": this.lr_id})
    .subscribe( 
        resultArray =>{ this.lrDetail = resultArray.response;
        this.imageLoader=false;
        this.total_frgt_amnt=parseInt(this.lrDetail.lr_charges.balance) + parseInt(this.lrDetail.lr_charges.to_pay) + 
                            parseInt(this.lrDetail.lr_charges.loading_unloading)
        console.log(this.total_frgt_amnt)
        const self = this;
          const xhr = new XMLHttpRequest()
          xhr.open("GET", this.lrDetail.transporter_details.transport_logo);
          xhr.responseType = "blob";
          xhr.send();
          xhr.addEventListener("load", function() {
              var reader = new FileReader();
              reader.readAsDataURL(xhr.response); 
              reader.addEventListener("loadend", function() {             
                  self.base64Img = reader.result;
                  document.getElementById('imageDiv').innerHTML = '<img width="100px" src="' + self.base64Img + '"/>';
                  document.getElementById('imageDiv1').innerHTML = '<img width="100px" src="' + self.base64Img + '"/>';
                  document.getElementById('imageDiv2').innerHTML = '<img width="100px" src="' + self.base64Img + '"/>';
              });     
          });
        })
  }

 
/*=========================== Preview Print PDF ================================*/
printDetail() {
  this.consignorDialog='none';
  this.consigneeDialog='none';
  this.driverDialog='none';
  let popupWinindow
  const innerContents = document.getElementById('partToPrint').innerHTML;
  popupWinindow = window.
      open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,header=no');
  popupWinindow.document.open();
  popupWinindow.document.
      write('<html><head></head><body onload="window.print()">' +
          innerContents + '</html>');
  popupWinindow.document.close();
  // this.generatePdf('partToPrint')

}

/*=========================== Preview Print PDF ================================*/
printDetail1() {
  this.consignorDialog='none';
  this.consigneeDialog='none';
  this.driverDialog='none';
  let popupWinindow
  const innerContents = document.getElementById('consignee').innerHTML;
  popupWinindow = window.
      open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,header=no');
  popupWinindow.document.open();
  popupWinindow.document.
      write('<html><head></head><body onload="window.print()">' +
          innerContents + '</html>');
  popupWinindow.document.close();
  // this.generatePdf('cosignee')
}

/*=========================== Preview Print PDF ================================*/
printDetail2() {
  this.consignorDialog='none';
  this.consigneeDialog='none';
  this.driverDialog='none';
  let popupWinindow
  const innerContents = document.getElementById('driver').innerHTML;
  popupWinindow = window.
      open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,header=no');
  popupWinindow.document.open();
  popupWinindow.document.
      write('<html><head></head><body onload="window.print()">' +
          innerContents + '</html>');
  popupWinindow.document.close();
  // this.generatePdf('driver')


}



/*============================= Generate PDF for Consignor =================================*/
consignorGeneratePdf() {

  var source = document.getElementById('partToPrint').innerHTML;
  console.log(source);
  
  var options = { background: '#fff' };
  try {
    html2canvas(document.querySelector('#partToPrint')).then(canvas => {
      console.log(canvas.toDataURL())
     var pdf = new jsPDF('p','pt','a3');
     console.log(pdf)
     pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 10, 10);
     this.base64 = pdf.output('datauri');
    //  pdf.save('Consignor')
    //  console.log(this.base64);
    this.consignorDialog='none';
    this.consigneeDialog='none';
    this.driverDialog='none';
    this.displaypdf = 'block';
     });
  }catch( e) {
  
  }
  }



/*============================= Generate PDF for consignee =================================*/
consigneeGeneratePdf() {
  
  var source = document.getElementById('consignee').innerHTML;
  console.log(source);
  
  var options = { background: '#fff' };
  try {
    html2canvas(document.querySelector('#consignee')).then(canvas => {
      console.log(canvas.toDataURL())
     var pdf = new jsPDF('p','pt','a3');
     console.log(pdf)
     pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 20, 20);
     this.base64 = pdf.output('datauri');
    // pdf.save(id)
    //  console.log(this.base64);
    this.consignorDialog='none';
    this.consigneeDialog='none';
    this.driverDialog='none';
    this.displaypdf = 'block';
     });
  }catch( e) {
  
  }
  }


/*============================= Generate PDF for driver =================================*/
driverGeneratePdf() {
  
  var source = document.getElementById('driver').innerHTML;
  console.log(source);
  
  var options = { background: '#fff' };
  try {
    html2canvas(document.querySelector('#driver')).then(canvas => {
      console.log(canvas.toDataURL())
     var pdf = new jsPDF('p','pt','a3');
     pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 20, 20);
     this.base64 = pdf.output('datauri');
    // pdf.save(id)
    //  console.log(this.base64);
    this.consignorDialog='none';
    this.consigneeDialog='none';
    this.driverDialog='none';
    this.displaypdf = 'block';
     });
  }catch( e) {
  
  }
  }

/*============================= Share PDF =================================*/
sharePdf(){
  this.submitted=true;
  this.pdfForm.value.file = this.base64;
  this.pdfForm.value.lr_id  = this.lr_id;
  console.log(this.pdfForm.value.email_id)
  const filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if(!filter.test(this.pdfForm.value.email_id))
  {
    
  }
  else if(this.pdfForm.value.email_id != '') {
  this.imageLoader=false;
  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  this.imageLoader = true;
  this.apiSerivce.addPdf(this.pdfForm.value).subscribe(resultArray => {
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
  this.cosigneeDisplayHtml='none';
  this.driverDisplayHtml='none';
  this.reOpen();
}


reOpen()
{
  this.cosignorDisplayHtml='block';
}

/*==============================Consignor Popup================================*/
consignor_pop()
{
  this.consignorDialog='block';
}

/*==============================Consignee Popup================================*/
consignee_pop()
{
  this.consigneeDialog='block';
  this.cosigneeDisplayHtml='block';
  this.cosignorDisplayHtml='none';
  this.driverDisplayHtml='none';
}
/*==============================Driver Popup================================*/
driver_pop()
{
  this.driverDialog='block';
  this.driverDisplayHtml='block';
  this.cosignorDisplayHtml='none';
  this.cosigneeDisplayHtml='none';
}

closeConsignor_pop()
{
  this.consignorDialog='none';
}
closeConsignee_pop()
{
  this.consigneeDialog='none';
}
closeDriver_pop()
{
  this.driverDialog='none';
}



}
