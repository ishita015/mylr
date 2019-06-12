import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MylrService} from './../../../mylr.service';

@Component({
  selector: 'app-create-voucher',
  templateUrl: './create-voucher.component.html',
  styleUrls: ['./create-voucher.component.css']
})
export class CreateVoucherComponent implements OnInit {
  submitted:boolean = false;
  public imageLoader=false;
  display2:string = 'none';
  message:string;
  cookieValue:any;
  transporter_detail:any;
  voucherResult:any;
  voucherForm;
  amountInWords;
  amount;
  
  constructor(private newService:MylrService, private router:Router, private cookieService:CookieService) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
     this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
     this.transporter_detail=this.cookieValue;
  }
  else{
    this.router.navigate(['/login']);
   }

   this.voucherForm = new FormGroup({
    transporter_id:new FormControl(this.transporter_detail.transporter_id), 
    fr_challan_id: new FormControl('',Validators.required),
    lr_id: new FormControl('',Validators.required),
    pay_to: new FormControl('',Validators.required),
    debit_to: new FormControl('',Validators.required),
    narration: new FormControl('',Validators.required),
    amount: new FormControl('',Validators.required),
    bill_no:new FormControl('',Validators.required),
    bill_date: new FormControl('',Validators.required),
    ledger_folio_number: new FormControl('',Validators.required),
    vehicle_number: new FormControl('',Validators.required),
    voucher_number:new FormControl('',Validators.required)
  })
}

//------------------------------------------------------------------------
convert(amnt) 
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
  
  
   this.amountInWords= numToWords(amnt);
  }
//--------------------------------------------------------------------------
submitVoucher(voucherForm){

  this.submitted = true;
  if(voucherForm.value.fr_challan_id == "" || voucherForm.value.fr_challan_id == undefined){
    console.log('fr_challan_id');
  }
  else if(voucherForm.value.pay_to == "" || voucherForm.value.pay_to == undefined){
    console.log('pay_to');
  }
  else if(voucherForm.value.debit_to == "" || voucherForm.value.debit_to == undefined){
    console.log('debit_to');
  }
  else if(voucherForm.value.narration == "" || voucherForm.value.narration == undefined){
    console.log('narration');
  }
  else if(voucherForm.value.bill_no == "" || voucherForm.value.bill_no == undefined){
    console.log('bill_no');
  }
  else if(voucherForm.value.bill_date == "" || voucherForm.value.bill_date == undefined){
    console.log('bill_date');
  }
  else if(voucherForm.value.amount == "" || voucherForm.value.amount == undefined){
    console.log('amount');
  }
  else if(voucherForm.value.lr_id == "" || voucherForm.value.lr_id == undefined){
    console.log('lr_id');
  }
  else if(voucherForm.value.ledger_folio_number == "" || voucherForm.value.ledger_folio_number == undefined){
    console.log('ledger_folio_number');
  }
  else if(voucherForm.value.vehicle_number == "" || voucherForm.value.vehicle_number == undefined){
    console.log('vehicle_number');
  }
  else if(voucherForm.value.voucher_number == "" || voucherForm.value.voucher_number == undefined){
    console.log('voucher_number');
  }
  else{
    this.imageLoader = true;
    console.log(voucherForm.value)
    this.newService.addVouchers(voucherForm.value).subscribe(resultArray => {
      this.voucherResult=resultArray;
      this.message = this.voucherResult.message;
      if(this.voucherResult.status ==true){
        this.display2="block";
        this.imageLoader = false;
      }
      else{
        this.display2="block";
        this.imageLoader = false;
      }
    })
  }
}

hidePop()
{
this.display2="none";                        
  /* -- Navigate To Template Page -- */
this.router.navigate(['/voucher/list']);
}


}
