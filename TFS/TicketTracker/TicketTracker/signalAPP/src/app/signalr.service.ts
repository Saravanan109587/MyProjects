import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import * as appConfig from './app.Constatants';

@Injectable()
export class SignalrService {

  connection: HubConnection;
  constructor(private http: HttpClient) {

    this.connection = new HubConnectionBuilder()
      .withUrl(appConfig.appConfig.SignalRApiURL)
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.start()
      .then(res => {
        debugger;
       
      })
      .catch(err => {
        console.error((err));
      })
 
  }


  getSignalRConnection = (): HubConnection => {
    return this.connection;
  }
}
