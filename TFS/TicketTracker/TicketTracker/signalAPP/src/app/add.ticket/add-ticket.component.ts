import { Component, OnInit } from '@angular/core';
import { ITicketManager, ITicketmaster } from './ITicketManager';
import {TicketmanagerService} from './ticketmanager.service';
 

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit, ITicketManager {
  TicketDetails: ITicketmaster;
  constructor(private TickermanagerService:TicketmanagerService) {
    this.TicketDetails = {} as ITicketmaster;

  }

  ngOnInit() {
  }
 
  AddnewTicket = (TicketDeatail: ITicketmaster) => {

    debugger
    this.TickermanagerService.AddnewTicket(TicketDeatail).then((res)=>{
      alert(res);
      this.TicketDetails = {} as ITicketmaster;
    })
  }

}
