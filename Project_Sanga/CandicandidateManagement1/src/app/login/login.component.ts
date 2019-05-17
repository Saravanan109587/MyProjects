import { Component, OnInit,Inject } from '@angular/core';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from './login.service'
import { FlashMessagesService } from 'ngx-flash-messages';
import{Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{SuccessdialogComponent} from '../Dialogs/successdialog/successdialog.component';
import{ErrordialogComponent} from '../Dialogs/errordialog/errordialog.component';
import{WaringdialogComponent} from '../Dialogs/waringdialog/waringdialog.component';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import * as config from '../shared/AppConfig'
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
   

})
export class LoginComponent implements OnInit {
  validateEmail:boolean=false;
  constructor(private logSer:LoginService,private flash:FlashMessagesService,private router:Router,private dialog:MatDialog,private formBuilder:FormBuilder) {

   }
   userForm = this.formBuilder.group({
    primaryEmail: ['', Validators.email],
    secondaryEmail: '',
   
 });
 
 
  

  public username:string;
  public Password:string;
    
  status:string; 
validateUser() {
     if(this.username && this.username !='' && this.Password && this.Password!='')
     {
       //to tore session
      localStorage.setItem('Currentuser',JSON.stringify({'token':'LogIn',name:this.username}))   
      config.ActiveCandidate.Name=this.username;
      config.ActiveCandidate.Email=this.Password;
      if(this.username==config.ValidAdmin.username && this.Password==config.ValidAdmin.Email){
        this.router.navigate(["/AddCandidate"])
       }
       else{   
       this.logSer.validateLogin(this.username,this.Password).subscribe(
       res=>{
        if(res[0].toUpperCase()=='INSERTED' ||res[0].toUpperCase()=='SUCCESS')
       {
        this.router.navigate(["/AddCandidateForm"]);
       }          
       else
       {
        let dialogRef = this.dialog.open(WaringdialogComponent, {
          height: '30%',
          width: '800px',
          data:{
            header:"Warning" ,
            body:"Sorry,This EmailId is already linked with candidate name ",
            Name:res[0]+' ',
            CustomMsg:'! Please try with your own EmailId'
            },disableClose:false
        });
        
       
       }
      
       
    },err=>{
      let dialogRef = this.dialog.open(ErrordialogComponent, {
        height: '30%',
        width: '800px',
        data:{
          header:"Error" ,
          body:config.errorMsg
          }
      });
   }) 
  }
      }
      else{
        let dialogRef = this.dialog.open(ErrordialogComponent,
           {
          height: '30%',
          width: '30%',
          data:{
            header:"Warning" ,
            body:"Please Enter valid UserName and Email "
            },disableClose:false
        });
      }
       
     
    
    
   }
   

  ngOnInit() {

    this.router.routerState.root.queryParams.subscribe(
      (params : any) => {
         console.log(params)
      }
   );
    
  }

}
