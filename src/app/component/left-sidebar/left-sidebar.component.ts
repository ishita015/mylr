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
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})

export class LeftSidebarComponent implements OnInit {

public showAd:any;
  constructor(private newService: MylrService) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.newService.advertisementlist({}).subscribe(
      resultArray => {
        this.showAd = resultArray;
        this.showAd = this.showAd.response
        console.log( this.showAd);
      });
   }

  ngOnInit() {
  }


}
