import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages: string[] = [];
  signalRConnection: HubConnection;
  ngOnInit() {
    
    
  }
  constructor(private http: HttpClient, private SignalRService: SignalrService) {
    
    this.signalRConnection = this.SignalRService.getSignalRConnection();
  
  }
}
