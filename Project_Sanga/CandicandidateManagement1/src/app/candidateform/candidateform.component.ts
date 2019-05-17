import { Component, OnInit } from '@angular/core';
import {ICandidate, IDepartments} from '../Interface/Candidate.interface';
import{FlashMessagesService} from 'ngx-flash-messages';
import { AddcandidateService } from '../addcandidate/addcandidate.service';
import{MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{SuccessdialogComponent} from '../Dialogs/successdialog/successdialog.component';
import{ErrordialogComponent} from '../Dialogs/errordialog/errordialog.component';
import{WaringdialogComponent} from '../Dialogs/waringdialog/waringdialog.component';
import * as config from '../shared/AppConfig';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-candidateform',
  templateUrl: './candidateform.component.html',
  styleUrls: ['./candidateform.component.scss']
})
export class CandidateformComponent implements OnInit {

  ActiveCandidate=config.ActiveCandidate;
  DepartmentList:string[];
  datePicketConfig: Partial<BsDatepickerConfig>
  constructor(private flash:FlashMessagesService,private addcandidateService:AddcandidateService,private dialog:MatDialog ) {
   this.candidateDetail={} as ICandidate;
   if(config.ActiveCandidate.Name !=config.ValidAdmin.username) 
  this.candidateDetail.Name=config.ActiveCandidate.Name;
  this.candidateDetail.EmailId=config.ActiveCandidate.Email;
  this.datePicketConfig = Object.assign({}, {
    containerClass: 'theme-dark-blue',
    showWeekNumbers: false

  })
   }

  ngOnInit() {
    this.GetAllDepartments();
  }
    candidateDetail:ICandidate;



    GetAllDepartments=()=>{

      this.addcandidateService.GetAllDepartments().subscribe(res=>{
        this.DepartmentList=res;
        this.candidateDetail.Department=this.DepartmentList[0];
        Err=>{
    
        }
      })
    }
    



  addCandidate(form:NgForm){
    
    if(this.candidateDetail)
      {    
        this.candidateDetail=  this.addcandidateService.checkCandidatenullvalue(this.candidateDetail);  
        this.addcandidateService.adddCandidate(this.candidateDetail).subscribe(res=>
          {
            if(res=='success'){
              let dialogRef = this.dialog.open(SuccessdialogComponent, {
                height: '30%',
                width: '900px',
                data:{
                  header:"Success" ,
                  body:"Candidate Added successfully"
                  }
              });
              form.reset();
            }
            else{
              let dialogRef = this.dialog.open(WaringdialogComponent, {
                height: '30%',
                width: '900px',
                data:{
                  header:"Warning" ,
                  body:'Candidate Already Exists with this Email and Name'+' ' ,
                  Name:res
                  }
              });
            }
       
          })
      }
 else{
  let dialogRef = this.dialog.open(ErrordialogComponent, {
    height: '30%',
    width: '900px',
    data:{
      header:"Error" ,
      body:config.errorMsg
      }
  });
    
  }


}
logOut = () => {
  this.addcandidateService.RemoveLocalstorage('Currentuser') 
 }


}
