import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  public display2='block';
  public condition:string;
  public message:string;
  public imageLoader;
  constructor(private route : ActivatedRoute, private router : Router) {

   }

  ngOnInit() {
    this.condition = this.route.snapshot.params['message']; 
    console.log(this.condition)
    if(this.condition == "success"){
      this.message = "Your Account is successfully Verified"
    }
    else if(this.condition == "failure"){
      this.message = "Something went wrong, please try latter"
    }
    else{
      this.message = "Something went wrong, please try latter"
    }
    /* "" */
  }

  hidePop(){
    if(this.condition == "success"){
      this.router.navigate(['/login'])
    }
    else if(this.condition == "failure"){
      this.router.navigate(['/'])
    }
  }

}
