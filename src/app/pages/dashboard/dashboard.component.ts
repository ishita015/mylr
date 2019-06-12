import { Component, OnInit } from '@angular/core';
import {MylrService} from './../../mylr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {dataObject} from './../models/data-object'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  resultant: any;
  output: any;
  cookieValue:any;
  transporter_id:string;
  datearray:any = []
  dataobj:dataObject;
  temp_array:any = [];
  temp_array2:any = [];
  public imageLoader:boolean = false;
  public barChartLabels:string[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
  public barChartData:any[];
  // [
  //   {data: [65, 59, 80, 81, 56, 55, 40,0,0,0,0,0,0,0,0,0], label: 'Series A'}
  // ];
  constructor(private router:Router,private cookieService:CookieService, private newService:MylrService) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('loginData');
    if(this.cookieValue != '' && this.cookieValue != undefined){
     this.cookieValue = JSON.parse(this.cookieService.get('loginData'));
   
     this.transporter_id=this.cookieValue.transporter_id;
    }
    else{
     this.router.navigate(['/login']);
    }
    this.imageLoader = true;
    this.newService.getDashboard({"transporter_id":this.transporter_id}).subscribe(resultArray => {
      this.output=resultArray;
      this.imageLoader = false;
      this.resultant = this.output.response;
      console.log(this.resultant);
      this.resultant.forEach(obj => {
         
         this.datearray.push(obj.register_date)
         this.temp_array.push(obj.count);
      })
      this.barChartLabels = this.datearray;
    //  this.temp_array[14] = 21;
      
      this.dataobj= {"data":this.temp_array, "label":"No. of LR Created"}
      console.log(this.dataobj);
      this.temp_array2.push(this.dataobj);
      this.barChartData = this.temp_array2;
      console.log(this.barChartData);
    })
  
  }
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}
