import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MylrService} from './../../../mylr.service';
import { CookieService } from 'ngx-cookie-service';
import * as jsPDF from 'jspdf'
import * as  html2canvas from 'html2canvas';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
@Component({
  selector: 'app-detail-freight',
  templateUrl: './detail-freight.component.html',
  styleUrls: ['./detail-freight.component.css']
})
export class DetailFreightComponent implements OnInit {
  public base64;
  displaypdf = 'none';
  displaymessage = 'none';
  submitted;
  
  public total_freight:any=0;
  fr_challan_id;
  cookieValue:any;
  transporter_detail:any;
  public imageLoader:any;
  base64Img;
  public frDetail:any={};
  public pdfDataUrl;
  lrsuccess;
  message;
  pdfForm = new FormGroup({
   mobile_number: new FormControl(''),
   email_id: new FormControl('', [Validators.pattern
     ('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
   file: new FormControl(''),
   lr_id: new FormControl('')
 });
  constructor(private apiSerivce: MylrService,private router : Router, private route: ActivatedRoute,private cookieService:CookieService) {

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
    this.fr_challan_id = this.route.snapshot.paramMap.get('fr_challan_id');
    console.log(this.fr_challan_id)
    this.imageLoader=true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.apiSerivce.freightDetail({"fr_challan_id": this.fr_challan_id})
    .subscribe( 
        resultArray =>{ this.frDetail = resultArray.response;
        this.imageLoader=false;
        console.log(this.frDetail.freight_challan_charges.less_advance)
        this.total_freight=parseInt(this.frDetail.freight_challan_charges.less_advance)-parseInt(this.frDetail.freight_challan_charges.balance)    
        console.log(this.total_freight)
        const self = this;
        const xhr = new XMLHttpRequest()
        xhr.open("GET", this.frDetail.transporter_details.transport_logo);
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
  convertToInt(val)
  {
    return parseInt (val);
  }
 

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          //........Customized style.......
          .test{'background-color':schemecolor}
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
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
      console.log(canvas.toDataURL())
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
  this.pdfForm.value.freight_challan_id  = this.fr_challan_id;
  const filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  console.log(this.pdfForm.value.email_id)
  if(!filter.test(this.pdfForm.value.email_id))
  {
    
  }
  else if(this.pdfForm.value.email_id != '') {
  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  this.imageLoader = true;
  this.apiSerivce.shareFc(this.pdfForm.value).subscribe(resultArray => {
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


