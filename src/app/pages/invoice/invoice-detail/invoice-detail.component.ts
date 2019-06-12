import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
// import { addFreight } from './../../../../app/pages/models/addfreight';
import { Router,ActivatedRoute } from '@angular/router';
//import { IMyDpOptions } from 'mydatepicker';
import { MylrService } from './../../../mylr.service';
import {invoiceDetail} from '../../../pages/models/invoicedetail';
import {detailbranch} from '../../../pages/models/detailbranch';
@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  public transporter_detail:any={};
  public showError:any={};
  public branchDetail:any=[];
  public invoiceDetail:invoiceDetail;
  public bankDetail;
  cookieValue:any;
  invoice_id:any;
  invoiceForm;
  submitted:any;
  errors:any;
  displayError1:any;
  public total_amount:any;
  charges:any;
  imageLoader;
 

  constructor(private router:Router,private cookieService:CookieService,private route: ActivatedRoute,private apiSerivce:MylrService) {
    
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
    
    // this.transporter_id=this.transporter_detail.transporter_id;
    this.apiSerivce.bankdetails({"transporter_id": this.transporter_detail.transporter_id})
    .subscribe( 
        resultArray =>{ this.bankDetail = resultArray.response;
        console.log(this.bankDetail)
        }
    )

/*-----------Branches-------------*/
    this.apiSerivce.detailbranch({"transporter_id": this.transporter_detail.transporter_id})
    .subscribe( 
        resultArray =>{ this.branchDetail = resultArray.response.branch_details;
        console.log(this.branchDetail) })

/*-----------Invoice Detail-------------*/
    this.invoice_id = this.route.snapshot.paramMap.get('invoice_id');
    this.imageLoader=true;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.apiSerivce.invoiceDetail({"invoice_id": this.invoice_id})
    .subscribe( 
        resultArray =>{ this.invoiceDetail = resultArray.response;
        console.log(this.invoiceDetail) 
        this.imageLoader=false;
        this.charges=this.invoiceDetail; 
        // console.log(this.charges)  
        console.log(this.charges)
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
      console.log(this.invoiceDetail.cgst)
      this.total_amount=parseInt(this.invoiceDetail.invoice_charges.loading_unloading_charges)+parseInt(this.invoiceDetail.invoice_charges.detention_amount)+parseInt(this.invoiceDetail.cgst)
      +parseInt(this.invoiceDetail.sgst)+parseInt(this.invoiceDetail.invoice_charges.total_tax)+parseInt(this.invoiceDetail.invoice_charges.total_value);
      console.log(this.total_amount)
      this.total_amount=(numToWords(this.total_amount));
      console.log(this.total_amount)    
        })
      
      
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

}
