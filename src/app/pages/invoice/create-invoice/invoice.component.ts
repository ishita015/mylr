import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
// import { addFreight } from './../../../../app/pages/models/addfreight';
import { Router } from '@angular/router';
//import { IMyDpOptions } from 'mydatepicker';
import { MylrService } from './../../../mylr.service';
import { addInvoice } from './.././../models/addinvoice';
@Component({
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  count;
  // public particulars_detail:any=[];
  public transporter_detail:any={};
  public showError:any={};
  public bankDetail;
  cookieValue:any;
  invoiceForm;
  submitted:any;
  errors:any;
  displayError1:any;
  transporter_id;
  val;
  total_amount;
  invoiceResult;
  message;
  detention_amount;
  loading_unloading_charges;
  display2;
  cgst;
  sgst;
  total_tax;

  public particulars_detail:Array<{"truck_number":string,"weight":string,"goods":string,"lr_number":string,"rate_pmt":string,"amount":string}>
 constructor(private router:Router,private cookieService:CookieService, private newService:MylrService) { 

 }
//  d: Date = new Date();
//  public myDatePickerOptions: IMyDpOptions = {
//   // other options...
//   dateFormat: 'yyyy-mm-dd',
//   editableDateField: false,
//    openSelectorOnInputClick: true,
//   height: '25px',
//   disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() - 1},
// };

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
   this.particulars_detail = []
   this.particulars_detail.push({"truck_number":"","weight":"","goods":"","lr_number":"","rate_pmt":"","amount":""})

   this.invoiceForm = new FormGroup({
    transporter_id:new FormControl('545'),
    lo_challan_id:new FormControl('1'),
    consignor:new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    state: new FormControl('', Validators.required),
    state_code: new FormControl('', Validators.required),
    gst_number: new FormControl('', Validators.required),
    invoice_date: new FormControl('', Validators.required),
    due_date: new FormControl('', Validators.required),
    invoice_number: new FormControl('', Validators.required),
    gst_no: new FormControl('', Validators.required),
    hsn_code: new FormControl('', Validators.required), 
    order_reference_number:new FormControl('', Validators.required), 
    order_ref_date:new FormControl('', Validators.required), 
    from:new FormControl('', Validators.required), 
    to:new FormControl('', Validators.required), 
    order_by:new FormControl('', Validators.required),
    loading_unloading_charges:new FormControl('', Validators.required),
    detention_amount:new FormControl('', Validators.required),
    total_value:new FormControl('', Validators.required),
    cgst:new FormControl('', Validators.required),
    sgst:new FormControl('', Validators.required),
    total_tax:new FormControl('', Validators.required),
    amount:new FormControl('', Validators.required),
    Branch_offices:new FormControl('', Validators.required),

    
    // particular:new FormControl('', Validators.required),
    // packages:new FormControl('', Validators.required),
    // weight:new FormControl('', Validators.required),
    particulars_detail:new FormControl('', Validators.required),
  })
  this.bankDetail1();
  }

  convertToInt(val)
  {
    return parseInt (val);
  }

  bankDetail1()
  {
    this.transporter_id=this.transporter_detail.transporter_id;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.newService.bankdetails({"transporter_id": this.transporter_id})
    .subscribe( 
        resultArray =>{ this.bankDetail = resultArray.response;
        console.log(this.bankDetail)
        }
    )
  }



  /*----------------number to words--------------------*/
   convert() 
   { 
   const arr = x => Array.from(x);
   const num = x => Number(x) || 0;
   const str = x => String(x);
   const isEmpty = xs => xs.length === 0;
   const take = n => xs => xs.slice(0,n);
   const drop = n => xs => xs.slice(n);
   const reverse = xs => xs.slice(0).reverse();
   const comp = f => g => x => f (g (x));
   const not = x => !x;
   const chunk = n => xs =>
     isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];
   
   // numToWords :: (Number a, String a) => a -> String
   let numToWords = n => {
     
     let a = [
       '', 'one', 'two', 'three', 'four',
       'five', 'six', 'seven', 'eight', 'nine',
       'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
       'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
     ];
     
     let b = [
       '', '', 'twenty', 'thirty', 'forty',
       'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
     ];
     
     let g = [
       '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
       'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
     ];
     
     // this part is really nasty still
     // it might edit this again later to show how Monoids could fix this up
     let makeGroup = ([ones,tens,huns]) => {
       return [
         num(huns) === 0 ? '' : a[huns] + ' hundred ',
         num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
         a[tens+ones] || a[ones]
       ].join('');
     };
     
     let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;
     
     if (typeof n === 'number')
       return numToWords(String(n));
     else if (n === '0')
       return 'zero';
     else
       return comp (chunk(3)) (reverse) (arr(n))
         .map(makeGroup)
         .map(thousand)
         .filter(comp(not)(isEmpty))
         .reverse()
         .join(' ');
   };
   this.total_amount=parseInt(this.invoiceForm.value.loading_unloading_charges)+parseInt(this.invoiceForm.value.detention_amount)+parseInt(this.invoiceForm.value.cgst)
   +parseInt(this.invoiceForm.value.sgst)+parseInt(this.invoiceForm.value.total_tax)+parseInt(this.invoiceForm.value.total_value);
   console.log(this.total_amount)
   this.total_amount=(numToWords(this.total_amount));
  }

/*------------------Submit-------------------------*/
submitInvoice(invoiceForm)
{
  console.log(invoiceForm.value)
  console.log(invoiceForm.value.invoice_date)
  this.submitted=true;
  // invoiceForm.value.invoice_date=invoiceForm.value.invoice_date.formatted;
  // invoiceForm.value.due_date=invoiceForm.value.due_date.formatted;
  // invoiceForm.value.order_ref_date= invoiceForm.value.order_ref_date.formatted;
  invoiceForm.value.transporter_id=this.transporter_detail.transporter_id
  invoiceForm.value.invoice_particulars=this.particulars_detail;
  if( this.particulars_detail.length >= 1){     
    if(this.particulars_detail[0].truck_number =='' && this.particulars_detail[0].weight == '' && this.particulars_detail[0].goods == ''
    && this.particulars_detail[0].lr_number == ''&& this.particulars_detail[0].rate_pmt == ''&& this.particulars_detail[0].amount == ''){
      
      this.displayError1="block";
      this.showError=true;
    }
    else{
      this.displayError1="none";
      this.showError=false;
    }
   }
  
  if(invoiceForm.value.consignor==''&&invoiceForm.value.address==''&&invoiceForm.value.state==''&&invoiceForm.value.state_code==''&&invoiceForm.value.gst_number==''&&invoiceForm.value.hsn_code==''&&invoiceForm.value.order_reference_number==''
  &&invoiceForm.value.order_ref_date==''&&invoiceForm.value.from==''&&invoiceForm.value.to==''&&invoiceForm.value.order_by==''
  &&invoiceForm.value.detention_amount==undefined&&invoiceForm.value.total_value==''
  &&invoiceForm.value.cgst==undefined&&invoiceForm.value.sgst==undefined
  &&invoiceForm.value.total_tax==undefined &&invoiceForm.value.amount==''&&invoiceForm.value.invoice_date==''&&invoiceForm.value.due_date==''&&invoiceForm.value.invoice_number=='')
  {
    
  }
  else
  {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.newService.addInvoice(invoiceForm.value).subscribe(resultArray => {
        this.invoiceResult = resultArray;        
        console.log(this.invoiceResult);
        if(this.invoiceResult.status == true){
          this.message = this.invoiceResult.message;
          this.display2="block";
        }
        else{
          this.display2="block";
        }
       
    })
  }
}




  public addRow(){
    
    this.particulars_detail.push({"truck_number":"","weight":"","goods":"","lr_number":"","rate_pmt":"","amount":""})
    this.count++;
    return false;
}

public deleteRow(i){
  this.count--;
  this.particulars_detail.splice(i,1)
  return false;
}

hidePop()
{
  this.display2="none";
}

}
