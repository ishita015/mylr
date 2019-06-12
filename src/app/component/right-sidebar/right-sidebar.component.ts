import { Component, OnInit } from '@angular/core';
import { HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {MylrService} from '../../mylr.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AdvertisementDetail } from '../../pages/models/advertisement';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { add } from './../../pages/models/add'
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {
  public showAd:any;
  public scroll:any;
  public adDetail:any={};
  public imageLoader:boolean;
  public display0='none';
  constructor(private newService: MylrService) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.newService.advertisementlist({}).subscribe(
      resultArray => {
        this.showAd = resultArray;
        this.showAd = this.showAd.response
      });
   }

  ngOnInit() {
    
}

detail(id)
{
  console.log(id)
  this.imageLoader=true;
  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.newService.advertisementDetail({'ad_id':id}).subscribe(
      resultArray => {
        this.imageLoader=false;
        this.display0='block';
        this.adDetail = resultArray.response;
      });
   }

  hidePopUp()
{
  this.display0='none';
}
}




