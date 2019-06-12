export class loadingChallan{
    transporter_id: number;
    lr_no: string;
    gst_number: string;
    vehicle_number:string;
    consignor: string;
    consignee: string;
    lr_date: string;
    invoice_number: string;
    invoice_amount:number;
    packages: number;
    actual_weight: number;
    particular: string;
    consignor_address: string;
    from: string;
    to: string;
    charge_details: charge_details;
  
   }

   export class charge_details {
    rate_pmt: number;
    total_freight: string;
    balance_freight: string;
    pay_at: string;
      
    }