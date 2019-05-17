import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
Ticket:boolean=true;
 
  constructor() { }

  ngOnInit() {
  }
  setpath=(key:number)=>{
if(key==1)
this.Ticket=true;
else if(key==2)
this.Ticket=false;
  }
}
