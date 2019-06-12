export class LoadingChallanAdd{
    transporter_id: number;
    vehicle_number:string;
    date_of_loading:any;
    loading_staff_name:any;
    contact_number:number;
   
    // charge_details: charge_details;
    to_station:any;
    total_tbb_freight:any;
    total_topay_freight: any;
    total_paid_freight:any;
    note:any;
    loading_challan_detail: loading_challan_detail;
   }

   export class loading_challan_detail {
    lr_date: string;
    lr_number: string;
    consignor: string;
    consignee: string;
    from: string;
    boxes: any;
    goods:any;
    weight:any;
    freight_type:any;
    amount:any;
    }