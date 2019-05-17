import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as appConfig from './app.Constatants';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TickerService {

  constructor(private httpclient:HttpClient) {
   
   }


   GetToptenTickets=(): Observable<any>=>{
      
    return this.httpclient.get(appConfig.appConfig.ApiBase+"TicketManager",{ headers: { 'Content-Type': 'application/json' }});
 // 'Access-Control-Allow-Origin': 'http://localhost:4200',
  ///'Access-Control-Allow-Methods': '*',
 /// 'Access-Control-Allow-Headers': '*'}});
       
   }

 deleteTicket=(TicketId:number): Observable<any>=>{
      
    return this.httpclient.delete(appConfig.appConfig.ApiBase+"TicketManager/DeleteTicket?TicketId="+TicketId,{ headers: { 'Content-Type': 'application/json' }});
 
       
   }
}
