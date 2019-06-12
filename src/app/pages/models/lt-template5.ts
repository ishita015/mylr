export class lrtemplate5 {
    transporter_id: number;
    template_id: number;
    lr_no: string;
    hsn_number: string;
    gst_number: string;
    delivery_address: string;
    consignment_note_number: number;
    eway_bill_number: string;
    consignor_gstn: string;
    consignment_note_number_date: number;
    consignor_name: string;
    consignor_address: string;
    consignee_name: string;
    consignee_address: string;
    from: string;
    to: string;
    in_time: number;
    out_time: number;
    consignment_date: number;
    packages: number;
    description: string;
    actual_weight: number;
    charged_weight: number;
    invoice_date: number;
    invoice_number: number;
    vehicle_number: string;
    driver_contact_no: number;
    driver_license_no: string;
    insurance_company: string;
    policy_number: number;
    amount: number;
    demarges_chargeable: string;
    from_today: string;
    charge_details: charge_details;
  
   }

   export class charge_details {
    total_freight: number;
    advance_freight: number;
    balance_freight: number;
    to_pay: number;
    tbb: string;   
    }