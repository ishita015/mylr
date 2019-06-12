export class LrTemplate2 {
    transporter_id: number;
    template_id: number;
    from_today: number;
    delivery_address: string;
    consignment_note_number: string;
    consignment_note_number_date: string;
    consignor_name: string;
    consinor_address: string;
    consinee_name: string;
    consignee_address: string;
    from: string;
    to: string;
    in_time: string;
    out_time: string;
    consignment_date: string;
    packages: string;
    description: string;
    actual_weight: number;
    charged_weight: number;
    length: number;
    width: number;
    height: number;
    invoice_date: string;
    invoice_number: string;
    gst_number: string;
    eway_bill_number: string;
    vehicle_number: string;
    account_of: string;
    insurance_company: string;
    policy_number: string;
    amount: number;
    charge_details: charge_details;
    remark: string;
}
  
export class charge_details {
    demarges_chargeable: string;
    total_freight: any;
    advance_freight: string;
     balance_freight: string;
    to_pay: string;
    tbb: string;
    charge_details: any;
    
}
