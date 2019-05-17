import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import {TickerService} from '../ticker.service';
import { SignalrService } from '../signalr.service';
import { ITicketManager, ITicketmaster } from '../add.ticket/ITicketManager';
@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit {
  signalRConnection: HubConnection;
TicketList:ITicketmaster[];
  constructor(private SignalRService: SignalrService,private ticketservice:TickerService) {
    this.TicketList =[];
    //this.GetTicketList();
    this.signalRConnection = this.SignalRService.getSignalRConnection();
    this.getTickets();
 
  }

   
  ngOnInit() {
    this.signalRConnection.on('ReceiveMessage',(name)=> {
      debugger;
     // alert('Dashboard');
    this.getTickets();
   })
 
  }

getTickets=()=>{
  this.ticketservice.GetToptenTickets().subscribe(res=>{

    this.TicketList=res;
  })
}

DeleteTicket=(TicketId:number)=>{
this.ticketservice.deleteTicket(TicketId).subscribe(res=>{
  this.getTickets();
})
}

EditTicket=(TicketId:number)=>{

}

 
 
}
 