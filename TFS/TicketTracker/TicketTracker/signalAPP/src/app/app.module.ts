import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SignalrService } from './signalr.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddTicketComponent } from './add.ticket/add-ticket.component';
import {TicketmanagerService} from './add.ticket/ticketmanager.service';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import{TickerService} from './ticker.service';

@NgModule({
  declarations: [
    AppComponent,
    AddTicketComponent,
    NavigationComponent,
    DashboradComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SignalrService,TicketmanagerService,TickerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
