import { BrowserModule } from '@angular/platform-browser';
//for ngModal
import {FormsModule} from '@angular/forms';
//FOr decoratorof app.module.ts
import { NgModule } from '@angular/core';

//for Http request
import { HttpClientModule } from '@angular/common/http';
//for Flash message
import { FlashMessagesModule } from 'ngx-flash-messages';
//For Routing
import { AppRoutingModule,RountingComponents } from './app-routing.module';
//Created components and services
import { AppComponent } from './app.component';
import { LoginService } from './login/login.service';
import { AddcandidateService } from './addcandidate/addcandidate.service';
import { CandidateformComponent } from './candidateform/candidateform.component';
//for material design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatDialogModule} from '@angular/material'
import { SuccessdialogComponent } from './Dialogs/successdialog/successdialog.component';
import {LoginComponent} from '././login/login.component';
import { WaringdialogComponent } from './Dialogs/waringdialog/waringdialog.component';
import { ErrordialogComponent } from './Dialogs/errordialog/errordialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConfirmationdialogComponent } from './Dialogs/confirmationdialog/confirmationdialog.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EmptyStringVallidatorDirective } from './shared/directives/empty-string-vallidator.directive';
import {TooltipModule} from "ngx-tooltip";

 

  
 

 
@NgModule({
  declarations: [
    AppComponent,
    RountingComponents,
    CandidateformComponent,
    SuccessdialogComponent,
    LoginComponent,
    WaringdialogComponent,
    ErrordialogComponent,
    ConfirmationdialogComponent,
    EmptyStringVallidatorDirective
  
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    AppRoutingModule ,
    FlashMessagesModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule
    
  ],
  exports: [
    
    
  ],
  entryComponents:[
    SuccessdialogComponent,
    ErrordialogComponent,
    WaringdialogComponent,
    ConfirmationdialogComponent
   
  ],

  providers: [LoginService, AddcandidateService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
