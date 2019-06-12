import { Component, OnInit } from '@angular/core';
import {MylrService} from './../../mylr.service'
import { TrackerList } from './../models/tracker-list';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TrackerPipe } from './tracker-filter.pipe';
import { searchTrackerData } from './../models/searchtracker';

@Component({
  selector: 'app-tracker-list',
  templateUrl: './tracker-list.component.html',
  styleUrls: ['./tracker-list.component.css']
})
export class TrackerListComponent implements OnInit {
  display2="none";
  display3="none";
  display4="none";
  message:string;
  submitted : boolean
  cookieValue: any;
  public TrackerFilter: any;
  public trackerData:any;
  public dataObj:any={};
  public dataObj1:any={};
  public isValid:any;
  public valid:boolean;
  public isValid1:any;
  public isValid2:any;
  public isValid3:any;
  public TrackerList:TrackerList;
  searchDataObj1:any={};
  searchDataObj2:any={};
  searchDataObj3:any={};
  searchDataObj4:any={};
  searchDataObj5:any={};
  searchDataObj6:any={};
  searchDataObj7:any={};
  searchDataObj8:any={};

  ad_files;
  displayadvert = "none";
  files: any;
  admin_id:any;
  transporter_id:any;
  image_url;
  status;
  response;
  TrackerStatus;
  TrackerMessage;
  public imageLoader:boolean=false;
  ad_title;
  filterArgs;
  vehicle_number;
  date_value;
  date_from;
  date_to;
  from;
  to;
  isShow;
  page;


//---------------------------   List of Tracker  -----------------------------------------------


constructor(private router:Router,private newService:MylrService,private cookieService:CookieService) {
  this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
  console.log(this.cookieValue)
  this.transporter_id=this.cookieValue.transporter_id;
  this.filterArgs = new TrackerList();  
  this.imageLoader= true;
  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  this.newService.TrackerList({"transporter_id": this.cookieValue.transporter_id}).subscribe(
    resultArray => 
    { 
      this.TrackerStatus = resultArray.status;
          this.TrackerMessage = resultArray.message;
          console.log(this.TrackerStatus);
          console.log(this.TrackerMessage)
          if(this.TrackerStatus == true){
            this.TrackerList = resultArray.response,
            console.log(this.TrackerList)
            this.imageLoader= false;
          }
         else{         
           this.imageLoader= false;
         }
    })
}

KeyPressVehicle(trackerData)
{
  if(trackerData.value.vehicle_number =="")
  {
    return this.isValid=false;
  }
  if(trackerData.value.vehicle_number != undefined)
  {
  return this.isValid=true;
  }
}

KeyPressDate(trackerData)
{
  if(trackerData.value.date_value =="")
  {
    return this.isValid1=false;
  }
  if(trackerData.value.date_value != undefined)
  {
  return this.isValid1=true;
  }
}

KeyPressDateRange(trackerData)
{
  if(trackerData.value.date_from !="")
  {
    return this.isValid2=true;
  }
  else
  {
  return this.isValid2=false;
  }
}

KeyPressStationRange(trackerData){
  console.log(trackerData.value.from)
  
  if(trackerData.value.from !="")
  {
    return this.isValid3=true;
  }
  else
  {
    return this.isValid3=false;
  }
}

vehicleFilter(trackerData)
{
  //this.TrackerList=TrackerList;
  this.imageLoader=true;
 console.log(this.transporter_id) 
 this.dataObj.vehicle_number=trackerData.value.vehicle_number;
 this.dataObj.transporter_id=this.transporter_id;
 delete this.dataObj.from;
 delete this.dataObj.to;
 delete this.dataObj.date_from;
 delete this.dataObj.date_value;
 delete this.dataObj.date_to;
 this.filterArgs = new TrackerList();
  this.newService.TrackerList(this.dataObj).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.imageLoader=false;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    console.log(this.TrackerList)
  })

}

dateFilter(trackerData)
{
  this.imageLoader=true;
  this.dataObj.date_value=trackerData.value.date_value;
  this.dataObj.transporter_id=this.transporter_id;
  delete this.dataObj.from;
  delete this.dataObj.to;
  delete this.dataObj.date_from;
  delete this.dataObj.vehicle_number;
  delete this.dataObj.date_to;
  this.newService.TrackerList(this.dataObj).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.imageLoader=false;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    console.log(this.TrackerList)
  })
}

dateRangeFilter(trackerData)
{
  this.dataObj.date_from=trackerData.value.date_from;
  this.dataObj.date_to=trackerData.value.date_to;
  this.dataObj.transporter_id=this.transporter_id;
  delete this.dataObj.from;
  delete this.dataObj.to;
  delete this.dataObj.date_value;
  delete this.dataObj.vehicle_number;    
  if(this.dataObj.date_to==undefined||this.dataObj.date_to=='')
  {
    this.display4="block";
  }
  else
  {
  this.imageLoader=true;
  this.newService.TrackerList(this.dataObj).subscribe(resultArray => {
    this.TrackerList=resultArray.response;    
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    this.imageLoader=false;
    console.log(this.TrackerList)
  })
}
}

stationRangeFilter(trackerData)
{
  this.dataObj.from=trackerData.value.from;
  this.dataObj.to=trackerData.value.to;
  this.dataObj.transporter_id=this.transporter_id
  delete this.dataObj.date_from;
  delete this.dataObj.date_to;
  delete this.dataObj.date_value;
  delete this.dataObj.vehicle_number;    
  if(this.dataObj.to==undefined||this.dataObj.to=='')
  {
    this.display3="block";
  }
  else
  {
  this.imageLoader=true;
  this.newService.TrackerList(this.dataObj).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.imageLoader=false;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    console.log(this.TrackerList)
  })
  }
}
//---------------------------------------------------------------------


//----------------------For Search by Lr_id----------------------------
searchBrId(lrId)
{
  if(lrId =='' || lrId ==undefined)
  {
    
  } 
  else{
  this.imageLoader=true;
  this.searchDataObj1.lr_id=lrId;
  this.newService.searchTrackerData(this.searchDataObj1).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    this.imageLoader=false;
  })
  }
}

//----------------------For Search by Cosignor----------------------------
searchBrConsignor(consignor)
{
  if(consignor =='' || consignor ==undefined)
  {
    
  }  
  else{
  this.imageLoader=true;
  this.searchDataObj2.consignor_name=consignor;
  this.newService.searchTrackerData(this.searchDataObj2).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    console.log(this.TrackerList)
    this.imageLoader=false;
  })
}
}

//----------------------For Search by Cosignee----------------------------
searchBrConsignee(consignee)
{
  if(consignee =='' || consignee ==undefined)
  {
    
  }  
  else{
  this.imageLoader=true;
  this.searchDataObj3.consignee_name=consignee;
  this.newService.searchTrackerData(this.searchDataObj3).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    this.imageLoader=false;
    console.log(this.TrackerList)
  })
  }
}

//----------------------For Search by Vehicle----------------------------
searchBrVehicle(vehicle)
{
  if(vehicle =='' || vehicle ==undefined)
  {
    
  }  
  else{
  this.imageLoader=true;
  this.searchDataObj4.vehicle_number=vehicle;
  this.newService.searchTrackerData(this.searchDataObj4).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    this.imageLoader=false;
    console.log(this.TrackerList)
  })  
  }
}


//----------------------For Search by Vehicle----------------------------
searchBrContact(contact)
{
  console.log(contact)
  if(contact =='' || contact ==undefined)
  {
    
  }  
  else{
  this.imageLoader=true;
  this.searchDataObj5.delivery_contact_number=contact;
  this.newService.searchTrackerData(this.searchDataObj5).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    this.imageLoader=false;
    console.log(this.TrackerList)
  })
  }
}

//----------------------For Search by from----------------------------
searchBrFrom(from)
{
  console.log(from)
  if(from =='' || from ==undefined)
  {
    
  }  
  else{
  this.imageLoader=true;
  this.searchDataObj6.station_source=from;
  this.newService.searchTrackerData(this.searchDataObj6).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    this.imageLoader=false;
    console.log(this.TrackerList)
  })
  }
}

//----------------------For Search by to----------------------------
searchBrTo(to)
{
  console.log(to)
  if(to =='' || to ==undefined)
  {
    
  }  
  else{
  this.imageLoader=true;
  this.searchDataObj7.station_destination=to;
  this.newService.searchTrackerData(this.searchDataObj7).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.imageLoader=false;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    console.log(this.TrackerList)
  })
  }
}

//----------------------For Search by to----------------------------
searchBrDate(date)
{
  console.log(date)
  if(date =='' || date ==undefined)
  {
    
  }  
  else{
  this.imageLoader=true;
  this.searchDataObj8.loading_date=date;
  this.newService.searchTrackerData(this.searchDataObj8).subscribe(resultArray => {
    this.TrackerList=resultArray.response;
    this.imageLoader=false;
    this.TrackerMessage = resultArray.message,
    this.TrackerStatus=resultArray.status;
    console.log(this.TrackerList)
  })
  }
}



  ngOnInit() {
  }


  hidePop3()
  {
    this.display3="none";
  }
  hidePop4()
  {
    this.display4="none";
  }

}
