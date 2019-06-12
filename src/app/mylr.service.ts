import { Injectable } from '@angular/core';
// import { Response } from '@angular/http/src/static_response';
import {Http, Response} from "@angular/http";
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {add1} from '../app/pages/models/add1';
import {logRes} from '../app/pages/models/res';
import {add} from '../app/pages/models/add';
import {addbranch} from '../app/pages/models/addbranch';
import {updatebranch} from '../app/pages/models/updatebranch';
import {detailbranch} from '../app/pages/models/detailbranch';
import {addtemplate} from '../app/pages/models/addtemplate';

import {lrList} from '../app/pages/models/lrlist';
import {lrCreate} from '../app/pages/models/lr-create';

import { addFreight } from '../app/pages/models/addfreight'
import{ freightDetail } from '../app/pages/models/freight-detail'
import { freightList } from '../app/pages/models/freight-list'
/* -- Rakesh -- */
import {profile} from '../app/pages/models/profile';
import {profileUpdate} from '../app/pages/models/profileupdate';
import {bankdetails} from '../app/pages/models/bankdetails';
import {updatebankdetails} from '../app/pages/models/updatebankdetails';
import {changepassword} from '../app/pages/models/changepassword';

import {freightChallanList} from '../app/pages/models/freightchallanlist'

import {AdvertisementDetail} from '../app/pages/models/advertisement';
import { contactUs} from '../app/pages/models/contact-us';

import {addcontactperson} from '../app/pages/models/addcontactperson';
import {listcontactperson} from '../app/pages/models/listcontactperson';
import {updatecontactperson} from '../app/pages/models/updatecontactperson';
import {editcontactperson} from '../app/pages/models/editcontactperson';

import {dashboardData} from '../app/pages/models/dashboard';

import {LrTemplate2} from '../app/pages/models/lr-template2';

import { loadingChallanList } from './../app/pages/models/loading-challan-list'
import { loadingChallanDetail } from './../app/pages/models/loading-challan-detail'

import {addInvoice} from '../app/pages/models/addinvoice';
import {invoiceList} from '../app/pages/models/invoicelist';
import {invoiceDetail} from '../app/pages/models/invoicedetail';
import {reSend} from '../app/pages/models/resend';

import { LoadingChallanAdd } from './../app/pages/models/loading-challan-add'
import {TrackerList} from '../app/pages/models/tracker-list';
import {searchTrackerData} from '../app/pages/models/searchtracker';
import {lrIdGet} from '../app/pages/models/lridget';
import {searchConsignorList} from './../app/pages/models/searchConsignorList';
import {lrRequest} from './../app/pages/models/lr-request';
import {verifyOtp} from './../app/pages/models/verify-otp';
import {verifyresend} from './../app/pages/models/verify-resend';
import {fcIdGet} from './../app/pages/models/fcidget';
import { freightAutoFill } from './../app/pages/models/freightautofill';

@Injectable()
export class MylrService {
  private _url:string="http://54.187.89.43/mylr/index.php/"
  response:string[];
  private log: string = "assets/login.json"
    isInvalidLogin : any = {}

  constructor(private http:Http,private router:Router) { }
  fetchData(){
    return this.http.get(this.log).map((response:Response) => response.json()).subscribe((assets) => console.log(assets))
    
  }
/*-- Dashboard --*/
  getDashboard(data):Observable<dashboardData>{
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this._url+'/Transporter/Profile/dashboard',data,options).map((response:Response)=>{
      console.log(response.json())
      return <dashboardData>response.json();
    })
  }

 add1(data):Observable<add1>{
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this._url+'Transporter/Transporter/signUp',data,options).map((response:Response)=>{
      console.log(response.json())
      return <add1>response.json();
    })
  }
                           /* Signup */
  addtemplate(data):Observable<addtemplate>{
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this._url+'/Transporter/Transporter/addTemplateOnSignup',data,options).map((response:Response)=>{
      console.log(response.json())
      return <addtemplate>response.json();
    })
  }

  add(data):Observable<logRes>{
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(
      this._url+'Transporter/Transporter/signin',data,options).map((response:Response)=>{
      console.log(response.json())
      return <logRes>response.json();
    })
  }

  contactRequest(data):Observable<contactUs>{
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this._url+'/Admin/Contact/addContactUs',data,options).map((response:Response)=>{
      console.log(response.json())
      return <contactUs>response.json();
    })
  }


                           /* Branch */

  addbranch(data):Observable<addbranch>{
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this._url+'/Transporter/Branch/addBranch',data,options).map((response:Response)=>{
      console.log(response.json())
      return <addbranch>response.json();
    })
  }
  detailbranch(data):Observable<detailbranch>{
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this._url+'/Transporter/Branch/showBranch',data,options).map((response:Response)=>{
      console.log(response.json())
      return <detailbranch>response.json();
    })
  
  }


  updatebranch(data):Observable<updatebranch>{
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this._url+'/Transporter/Branch/updateBranch',data,options).map((response:Response)=>{
      console.log(response.json())
      return <updatebranch>response.json();
    })
  }

  /* Branch */
      profile(transporter_id):Observable<profile>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Profile/showData',transporter_id,options).map((response:Response)=>{
        console.log(response.json())
        return <profile>response.json();
      })
    }
  
    profileUpdate(data):Observable<profileUpdate>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Profile/updateData',data,options).map((response:Response)=>{
        console.log(response.json())
        return <profileUpdate>response.json();
      })
    }
  
    bankdetails(transporter_id):Observable<bankdetails>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Profile/showBankDetails',transporter_id,options).map((response:Response)=>{
        console.log(response.json())
        return <bankdetails>response.json();
      })
    }
  
    updatebankdetails(data):Observable<updatebankdetails>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Profile/updateBankDetails',data,options).map((response:Response)=>{
        console.log(response.json())
        return <updatebankdetails>response.json();
      })
    }
  
    changepassword(data):Observable<changepassword>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Transporter/changePassword',data,options).map((response:Response)=>{
        console.log(response.json())
        return <changepassword>response.json();
      })
    }

    lrList(data):Observable<lrList>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Lr_new/listLr',data,options).map((response:Response)=>{
        console.log(response.json())
        return <lrList>response.json();
      })
    } 

    lrCreate(data):Observable<lrCreate>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Lr_new/addLr',data,options)
      .map((response:Response)=>{
        console.log(response.json())
        return <lrCreate>response.json();
      })
    }

    lrDetail(data):Observable<any>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Lr_new/lrDetails',data,options).map((response:Response)=>{
        console.log(response.json())
        return <any>response.json();
      })
    }
    
  
    advertisementlist(data): Observable<AdvertisementDetail>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Admin/Advertisement/showAdvertsList',data,options).map((response:Response)=>{
        console.log(response.json())
        return <AdvertisementDetail>response.json();
      })
    }

    /* Contact Person */

    addcontactperson(data):Observable<addcontactperson>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Branch/addContactPerson',data,options).map((response:Response)=>{
        console.log(response.json())
        return <addcontactperson>response.json();
      })
    }         
    listcontactperson(data):Observable<listcontactperson>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Branch/showContactPersonsList',data,options).map((response:Response)=>{
        console.log(response.json())
        return <listcontactperson>response.json();
      })
    }
  
    editcontactperson(contact_person_id: any):Observable<editcontactperson>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'/Transporter/Branch/showContactPersonDetails',contact_person_id,options).map((response:Response)=>{
        console.log(response.json())
        return <editcontactperson>response.json();
      })
    }
    updatecontactperson(contact_person_id: any):Observable<updatecontactperson>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Branch/updateContactPerson',contact_person_id,options).map((response:Response)=>{
        console.log(response.json())
        return <updatecontactperson>response.json();
      })
    }
    LrTemplate2(data):Observable<LrTemplate2>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Lr/addLr',data,options)
      .map((response:Response)=>{
        console.log(response.json())
        return <LrTemplate2>response.json();
      })
    } 
     /*-------------Freight-----------------------------------------*/
    
     addFreight(data):Observable<addFreight>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Challan/addFreightChallan',data,options).map((response:Response)=>{
        console.log(response.json())
        return <addFreight>response.json();
      })
    } 
    
    freightChallanList(data):Observable<freightChallanList>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Challan/showFreightChallans',data,options).map((response:Response)=>{
        console.log(response.json())
        return <freightChallanList>response.json();
      })
    } 

    freightDetail(data):Observable<any>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post( this._url + 'Transporter/Challan/freightChallanDetails',data,options).map((response:Response)=>{
        console.log(response.json())
        return <any>response.json();
      })
    } 
    
    /* -- Vouchers -- */
     addVouchers(data):Observable<any>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url + 'Transporter/Voucher/addVoucher',data,options)
      .map((response:Response)=>{
        console.log(response.json())
        return <any>response.json();
      })
    } 

    listVouchers(data):Observable<any>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url + 'Transporter/Voucher/showVouchers',data,options)
      .map((response:Response)=>{
        console.log(response.json())
        return <any>response.json();
      })
    } 

    voucherDetail(data):Observable<any>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url + 'Transporter/Voucher/showVoucherDetails',data,options)
      .map((response:Response)=>{
        console.log(response.json())
        return <any>response.json();
      })
    } 

    //----------------------------------------------------------
    loadingChallanList(data):Observable<loadingChallanList> {
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
          return this.http.post(this._url+'Transporter/Loading_challan/showLoadingChallans',data,options).map(
            (response: Response) => {
              console.log(response.json())
                return <loadingChallanList>response.json();
              })
    }
    loadingChallanDetail(data):Observable<loadingChallanDetail>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Loading_challan/showLoadingChallanDetails',data,options).map((response:Response)=>{
        console.log(response.json())
        return <loadingChallanDetail>response.json();
      })
    }
    /* -- -------------------------------------------*/
    addInvoice(data):Observable<addInvoice>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post( this._url + 'Transporter/Invoice/addInvoice',data,options).map((response:Response)=>{
        console.log(response.json())
        return <addInvoice>response.json();
      })
    }
    invoiceList(data):Observable<invoiceList>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post( this._url + 'Transporter/Invoice/showInvoices',data,options).map((response:Response)=>{
        console.log(response.json())
        return <invoiceList>response.json();
      })
    } 
    invoiceDetail(data):Observable<invoiceDetail>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post( this._url + 'Transporter/Invoice/showInvoiceDetails',data,options).map((response:Response)=>{
        console.log(response.json())
        return <invoiceDetail>response.json();
      })
    } 
    reSend(data):Observable<reSend>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post( this._url + 'Transporter/Transporter/resendMailOnFailure',data,options).map((response:Response)=>{
        console.log(response.json())
        return <reSend>response.json();
      })
    }

    TrackerList(data):Observable<TrackerList>{
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this._url+'Transporter/Tracker/trackerData',data,options).map((response:Response)=>{
        console.log(response.json())
        return <TrackerList>response.json();
      })
    } 
  
    /* -- Loading Challan Add Service -- */
    LoadingChallanAdd(data):Observable<LoadingChallanAdd> {
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
          return this.http.post(this._url+'Transporter/Loading_challan/addLoadingChallan',data,options).map(
            (response: Response) => {
              console.log(response.json())
                return <LoadingChallanAdd>response.json();
              })
    }
    //-----------------------------------------------------------------
      /* -- For Search Tracker Data -- */
      searchTrackerData(data):Observable<searchTrackerData> {
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
          const options = new RequestOptions({ headers: headers });
            return this.http.post(this._url+'Transporter/Tracker/searchList',data,options).map(
              (response: Response) => {
                console.log(response.json())
                  return <searchTrackerData>response.json();
              })
            }
    //-------------------------------------------------------------------
    lrIdGet(data):Observable<lrIdGet> {
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
          return this.http.post(this._url+'Transporter/Lr_new/loadingLrList',data,options).map(
            (response: Response) => {
              console.log(response.json())
                return <lrIdGet>response.json();
            })
          }

  //---------------------------------------------------------------
    /* -- For SearchConsignor -- */
    searchConsignorList(data):Observable<lrCreate> {
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
          return this.http.post(this._url+'Transporter/Search/dataList',data,options).map(
            (response: Response) => {
              console.log(response.json())
                return <lrCreate>response.json();
            })
          }

  //---------------------------------------------------------------
    /* -- For LR Request -- */
    lrRequest(data):Observable<lrRequest> {
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
          return this.http.post(this._url+'Transporter/Lr_request/createRequest',data,options).map(
            (response: Response) => {
              console.log(response.json())
                return <lrRequest>response.json();
            })
          }

     /* -- For OTP -- */
     verifyOtp(data):Observable<verifyOtp> {
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
          return this.http.post(this._url+'Transporter/Lr_request/verifyOtp',data,options).map(
            (response: Response) => {
              console.log(response.json())
                return <verifyOtp>response.json();
            })
          }
          verifyResend(data):Observable<verifyresend> {
            const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
              const options = new RequestOptions({ headers: headers });
                return this.http.post(this._url+'Transporter/Lr_request/resendOtp',data,options).map(
                  (response: Response) => {
                    console.log(response.json())
                      return <verifyresend>response.json();
                  })
                }
    

                addPdf(data):Observable<any>{
                  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                  const options = new RequestOptions({ headers: headers });
                  return this.http.post(this._url + 'Share/shareLr',data,options)
                  .map((response:Response)=>{
                    console.log(response.json())
                    return <any>response.json();
                  })
                } 

                fcIdGet(data):Observable<fcIdGet> {
                  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                    const options = new RequestOptions({ headers: headers });
                      return this.http.post(this._url+'Transporter/Lr_new/freightLrList',data,options)
                      .map((response: Response) => {
                          console.log(response.json())
                            return <fcIdGet>response.json();
                        })
                      }
          getstate(data): Observable<any> {
              // get users from api
              return this.http.get('assets/signup.json')
                  .map((response: Response) => {
                    console.log(response.json());
                      return response.json();
                  }
              )
            
          } 

          shareLc(data):Observable<any>{
            const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            const options = new RequestOptions({ headers: headers });
            return this.http.post(this._url + 'Share/shareLoadingChallan',data,options)
            .map((response:Response)=>{
              console.log(response.json())
              return <any>response.json();
            })
          }
          shareFc(data):Observable<any>{
            const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            const options = new RequestOptions({ headers: headers });
            return this.http.post(this._url + 'Share/shareFreightChallan',data,options)
            .map((response:Response)=>{
              console.log(response.json())
              return <any>response.json();
            })
          }
          forgetPass(data):Observable<any>{
            const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            const options = new RequestOptions({ headers: headers });
            return this.http.post(this._url + 'Transporter/Transporter/forgotPassword',data,options)
            .map((response:Response)=>{
              console.log(response.json())
              return <any>response.json();
            })
          }
          resetPass(data):Observable<any>{
            const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            const options = new RequestOptions({ headers: headers });
            return this.http.post(this._url + 'Transporter/Transporter/resetPassword',data,options)
            .map((response:Response)=>{
              console.log(response.json())
              return <any>response.json();
            })
          }
          advertisementDetail(data):Observable<any>{
            const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            const options = new RequestOptions({ headers: headers });
            return this.http.post(this._url + 'Admin/Advertisement/showAdvertDetails',data,options)
            .map((response:Response)=>{
              console.log(response.json())
              return <any>response.json();
            })
          }

          vehicleList(data):Observable<any>{
            const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
            const options = new RequestOptions({ headers: headers });
            return this.http.post(this._url + 'Transporter/Search/searchFreightChallanFromTransproterId',data,options)
            .map((response:Response) =>{
              return <any>response.json();
            })
          }
          
          
          
            


}
