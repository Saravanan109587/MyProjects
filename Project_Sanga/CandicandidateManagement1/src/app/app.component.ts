import { Component, OnInit } from '@angular/core';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import{Router,Event, NavigationStart, NavigationEnd, NavigationError} from    '@angular/router';
import{LoginService} from './login/login.service';
import * as config from './shared/AppConfig';
import { PlatformLocation, LocationChangeEvent } from '@angular/common'
import{BsDatepickerConfig} from 'ngx-bootstrap/datepicker'
  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
 constructor(private route:Router,private loginService:LoginService,plat:PlatformLocation){


  this.route.events.subscribe((ev:Event)=>{

    if (ev instanceof NavigationStart) {
      console.log('NavigationStar')
  }

  if (ev instanceof NavigationEnd) {
    if(!localStorage.getItem('Currentuser')){
      this.route.navigate(['/logIn']);
    }
    
  }

  if (ev instanceof NavigationError) {
    console.log('NavigationError')
      console.log(ev.error);
  }

  })
  plat.onPopState(() => {

   
   

});

 }
 ngOnInit(){
  this.loginService.getvalidAdmin().subscribe(res=>{
    config.ValidAdmin.username=res[0].Username;
    config.ValidAdmin.Email=res[0].EmailId;

  })
  this.route.navigate(['/logIn']);

 }

}
