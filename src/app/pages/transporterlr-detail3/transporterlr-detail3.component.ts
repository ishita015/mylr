import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MylrService} from './../../mylr.service';
import { CookieService } from 'ngx-cookie-service';
import * as jsPDF from 'jspdf';
import * as  html2canvas from 'html2canvas';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-transporterlr-detail3',
  templateUrl: './transporterlr-detail3.component.html',
  styleUrls: ['./transporterlr-detail3.component.css']
})
export class TransporterlrDetail3Component implements OnInit {
  public lrDetail: any = {};
  public lr_id:string;
  cookieValue:any;
  transporter_detail:any;
  imageLoader;
  public base64;
public inTime:any=0;
 public outTime:any=0;
displaypdf = 'none';
displaymessage = 'none';
consignorDialog='none';
consigneeDialog='none';
driverDialog='none';
cosigneeDisplayHtml='none';
driverDisplayHtml='none';
cosignorDisplayHtml='block';
lrsuccess;
submitted;
message;
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
  constructor(private apiSerivce: MylrService,private router : Router, private cookieService:CookieService, private route: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.lr_id = this.route.snapshot.paramMap.get('lr_id');
    // this.cookieValue = this.cookieService.get('loginData');
    // if(this.cookieValue != '' && this.cookieValue != undefined){
    //  this.cookieValue = JSON.parse(this.cookieService.get('loginData'));   
    //  this.transporter_detail=this.cookieValue;
    //  let l_id = this.router.url; 
    //  l_id =  l_id[l_id.length -1];
    //  if( l_id != this.transporter_detail.template_id){
    //    this.router.navigate(['/lr/detail', this.lr_id, this.transporter_detail.template_id]);
    //  }

    // }
    // else{
    //  this.router.navigate(['/login']);
    // }
    this.imageLoader=true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.apiSerivce.lrDetail({"lr_id": this.lr_id})
    .subscribe( 
        resultArray =>{ this.lrDetail = resultArray.response;
            this.imageLoader=false;
    
            //Time Converting form 24 hr to 12 hr
            var timeString = this.lrDetail.vehicle_intime
            var H = +timeString.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? "AM" : "PM";
            timeString = h + timeString.substr(2, 3)+' ' + ampm;
            this.inTime=timeString
            console.log(timeString);
    
            //Time Converting form 24 hr to 12 hr
            var timeString1 = this.lrDetail.vehicle_outtime
            var H = +timeString1.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? "AM" : "PM";
            timeString1 = h + timeString1.substr(2, 3) +' ' + ampm;
            this.outTime=timeString1
            console.log(timeString1);
            console.log(this.lrDetail)
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
                      document.getElementById('imageDiv').innerHTML = '<img width="80px" src="' + self.base64Img + '"/>';
                      document.getElementById('imageDiv0').innerHTML = '<img width="80px" src="' + self.base64Img + '"/>';
                      document.getElementById('imageDiv1').innerHTML = '<img width="80px" src="' + self.base64Img + '"/>';
                      document.getElementById('imageDiv2').innerHTML = '<img width="80px" src="' + self.base64Img + '"/>';
                      document.getElementById('imageDiv3').innerHTML = '<img width="80px" src="' + self.base64Img + '"/>';
                      document.getElementById('imageDiv4').innerHTML = '<img width="80px" src="' + self.base64Img + '"/>';
                  });     
              });
            });
  }

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
     pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 20, 20);
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



/*============================= Generate PDF =================================*/
generatePdf() {
  var source = document.getElementById('partToPrint').innerHTML;
  console.log(source);
  
  var options = { background: '#fff' };
  try {
    html2canvas(document.querySelector("#partToPrint"),{
      width: 1200,
      height: 2500
    }).then(canvas => {
      console.log(canvas.toDataURL())
     var pdf = new jsPDF('p','pt','a3');
     pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 20, 20);
     this.base64 = pdf.output('datauri');
    //pdf.save('asdsa')
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
    this.pdfForm.value.lr_id  = this.lr_id;
    const filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(!filter.test(this.pdfForm.value.email_id))
    {
      
    }
    else if(this.pdfForm.value.email_id != '') {
    this.imageLoader=true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.apiSerivce.addPdf(this.pdfForm.value).subscribe(resultArray => {
      this.lrsuccess = resultArray;
      this.message = this.lrsuccess.message;
      this.imageLoader=false;
      if(this.lrsuccess.status = true){
        this.displaypdf = 'none';
      }
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
