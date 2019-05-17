import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITicketmaster, ITicketManagerService } from './ITicketManager';
import * as config from './../app.Constatants';
@Injectable()
export class TicketmanagerService implements ITicketManagerService {

  constructor(private http: HttpClient) { }
 
  AddnewTicket = (TicketDeatail: ITicketmaster):any => {
    this.http.put(config.appConfig.ApiBase + "TicketManager/AddNewTicket", TicketDeatail).subscribe(res => {
      return res;
    })

  }

}
