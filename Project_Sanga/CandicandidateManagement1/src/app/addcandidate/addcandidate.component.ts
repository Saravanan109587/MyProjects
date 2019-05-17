import { Component, OnInit, TemplateRef } from '@angular/core';
//Interface
import { ICandidate, IDepartments } from '../Interface/Candidate.interface';
import { AddcandidateService } from './addcandidate.service';
//for flash message
import { FlashMessagesService } from 'ngx-flash-messages';
//Routing module
import { Router } from '@angular/router';
//MAT module
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//Dilog components
import { SuccessdialogComponent } from '../Dialogs/successdialog/successdialog.component';
import { ErrordialogComponent } from '../Dialogs/errordialog/errordialog.component';
import { WaringdialogComponent } from '../Dialogs/waringdialog/waringdialog.component';
import { ConfirmationdialogComponent } from '../Dialogs/confirmationdialog/confirmationdialog.component';
//to handle modal driven forms
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//Glogal configurations
import * as config from '../shared/AppConfig';
//ngx bootstrap modal module
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addcandidate',
  templateUrl: './addcandidate.component.html',
  styleUrls: ['./addcandidate.component.scss']
})
export class AddcandidateComponent implements OnInit {
  modalref: BsModalRef;
  public deleteCandidate: ICandidate;
  public ActiveCandidate: any = config.ActiveCandidate;
  DepartmentList: string[];
  public Department: string;
  angForm: FormGroup;
  datePipeEn: DatePipe = new DatePipe('en-US')
  datePicketConfig: Partial<BsDatepickerConfig>
  constructor(private addcandidateService: AddcandidateService, 
    private flash: FlashMessagesService, private route: Router, private dialog: MatDialog
    , private fb: FormBuilder, private formBuilder: FormBuilder, private modalservice: BsModalService) {


     //ngx Bootstrap Date picker Theme configuration
    this.datePicketConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false

    })

    this.candidateDetail = {} as ICandidate;
  }

   
  //Add candidate
  candidateDetail: ICandidate;

  public editcandidate: number = 1;
  public updateCandidateButton: boolean = false;

  //serach Candidate
  public searchCandidatename: string;
  public searchCandidateEmail: string;
  public searchCandidateDetails: ICandidate[];
  public showCandidateList: boolean = false;
 
  ngOnInit() {
    this.GetAllDepartments();

  }
//Generate Exel file 
  GenerateExcel=()=>{
    for(var i=0;i<this.searchCandidateDetails.length;i++){
      this.searchCandidateDetails[i]=this.addcandidateService.checkCandidatenullvalue(this.searchCandidateDetails[i]);
    }

    new Angular2Csv(this.searchCandidateDetails, 'Candidate List('+this.datePipeEn.transform(new Date(),"MM/dd/yyyy"+")").toString(),{
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      useBom: true,
      headers:Object.keys(this.searchCandidateDetails[0])
        });
  }
//Get all available Departments for dropdown
  GetAllDepartments = () => {
    this.addcandidateService.GetAllDepartments().subscribe(res => {
      this.DepartmentList = res;
      this.candidateDetail.Department = this.DepartmentList[0];

    },
      Err => {
        let dialogRef = this.dialog.open(ErrordialogComponent, {
          height: '30%',
          width: '900px',
          data: {
            header: "Error",
            body: config.errorMsg
          }
        });




      })
  }
//Registrating Candidates
  addCandidate(form: NgForm) {

    if (this.candidateDetail) {
      this.candidateDetail = this.addcandidateService.checkCandidatenullvalue(this.candidateDetail);
      this.addcandidateService.adddCandidate(this.candidateDetail).subscribe
        (
        res => {
          if (res == 'success') {

            let dialogRef = this.dialog.open(SuccessdialogComponent, {
              height: '30%',
              width: '900px',
              
              data: {
                header: "Success",
                body: "Candidate Added successfully"
              }
            });

            form.reset();

          }
          else {
            this.candidateDetail = this.addcandidateService.MakeCandidatenullvalue(this.candidateDetail);
            let dialogRef = this.dialog.open(WaringdialogComponent, {
              height: '30%',
              width: '900px',
              panelClass:'nillOverflow',
              data: {
                header: "Warning",
                body: 'Candidate Already Exists with this Email and Name' + ' ',
              Name:res
            }
            });

          }
          this.updateCandidateButton = false;

        },
        err => {
          this.candidateDetail = this.addcandidateService.MakeCandidatenullvalue(this.candidateDetail);
          let dialogRef = this.dialog.open(ErrordialogComponent, {
            height: '30%',
            width: '900px',
            data: {
              header: "Error",
              body: config.errorMsg
            }
          });

          this.updateCandidateButton = false;
        })

    }
    else {
      this.flash.show('Please Fill all the Fields to Add Candidate', {
        classes: ['alert', 'alert-danger'],
        timeout: 1000
      })

    }


  }

  //Close popUp
  cancel = () => {
    this.modalref.hide();
    this.candidateDetail = {} as ICandidate;
  }

  //search Candidate in DB
  searchCandidate = () => {

    this.checkUndeined();
    if ((this.searchCandidatename && this.searchCandidatename != '') || (this.searchCandidateEmail && this.searchCandidateEmail != '')) {
      this.addcandidateService.searchCandidate(this.searchCandidatename, this.searchCandidateEmail)
        .subscribe(res => {
          if (res.length > 0) {
            this.searchCandidateDetails = res;
            this.showCandidateList = true;
          }
          else {
            let dialogRef = this.dialog.open(WaringdialogComponent, {
              height: '30%',
              width: '900px',
              data: {
                header: "Warning",
                body: 'No candidates found with your details'
              }
            });
            this.showCandidateList = false;
          }


        }, err => {

          let dialogRef = this.dialog.open(ErrordialogComponent, {
            height: '30%',
            width: '900px',
            data: {
              header: "Error",
              body: config.errorMsg
            }
          });
          this.showCandidateList = false;
          this.searchCandidatename = undefined;
          this.searchCandidateEmail = undefined;

        })
    }
    else {
      this.flash.show('Please Fill Atleast one field to serach candidate', {
        classes: ['alert', 'alert-danger'],
        timeout: 1000
      })
      this.searchCandidatename = undefined;
      this.searchCandidateEmail = undefined;
      this.showCandidateList=false;
    }

  }

  //check undefined values and make them as defied to avoid null Exception
  checkUndeined = () => {
    if (!this.searchCandidatename) {
      this.searchCandidatename = ''
    }
    if (!this.searchCandidateEmail) {
      this.searchCandidateEmail = ''
    }

  }
//confirm before delete Candidates

  confirmToDeleteCandidate = (confirmdelete: TemplateRef<any>, candidate: ICandidate) => {
    this.deleteCandidate = candidate;
    this.modalref = this.modalservice.show(confirmdelete);
  }

  //Remove candidate from DB
  deleteCaandidate = () => {
    this.modalref.hide();
    this.addcandidateService.deleteCandidates(this.deleteCandidate.EmailId).subscribe(
      res => {
        if (res == 1) {
          let dialogRef = this.dialog.open(SuccessdialogComponent, {
            height: '30%',
            width: '900px',
            data: {
              header: "Success",
              body: this.deleteCandidate.Name + ' ' + ' Successfully deleted'
            }
          })
          let count = 0;
          let c = this.dialog._afterAllClosed.subscribe(res => {
            if (count == 0) {
              this.searchCandidate();
              count++;

            }

          })
        }
        else {
          let dialogRef = this.dialog.open(ErrordialogComponent, {
            height: '30%',
            width: '900px',
            data: {
              header: "Error",
              body: config.errorMsg
            }
          })

        }
      },
      err => {


      }
    )

  }

  //to view  candidate details

  ViewCandidate = (ViewCandidateModal: TemplateRef<any>, candidate: ICandidate) => {
    this.candidateDetail = candidate;
    this.modalref = this.modalservice.show(ViewCandidateModal, { class: 'gray modal-lg' })
  }

  //EditCandidate details 

  editCaandidate = (candidate: ICandidate) => {
    this.candidateDetail = candidate;
    this.updateCandidateButton = true;
    this.editcandidate = 1;
    this.showCandidateList = false;
  }



  //updates candidate details in DB
  updtaeCandidate = (form: NgForm) => {

    this.addcandidateService.UpdateCandidates(this.candidateDetail).subscribe(
      res => {
        if (res == 1) {
          let dialogRef = this.dialog.open(SuccessdialogComponent, {
            height: '30%',
            width: '900px',
            panelClass:'nillOverflow',
            data: {
              header: "Success",
              body: 'Candidate updated successfully'
            }
          });
          this.updateCandidateButton = false;
          form.reset();
        }
        else {
          this.candidateDetail = this.addcandidateService.MakeCandidatenullvalue(this.candidateDetail);
          let dialogRef = this.dialog.open(WaringdialogComponent, {
            height: '30%',
            width: '900px',
            panelClass:'nillOverflow',
            data: {
              header: "Warning",
              body: config.errorMsg
            }
          });

        }

      },
      err => {
        let dialogRef = this.dialog.open(ErrordialogComponent, {
          height: '30%',
          width: '900px',
          data: {
            header: "Warning",
            body: config.errorMsg
          }
        });
        this.candidateDetail = this.addcandidateService.MakeCandidatenullvalue(this.candidateDetail);

      }
    )


  }
//To navigation between thed UL Lists
  setpath = (id: number) => {
    this.editcandidate = id;
    this.showCandidateList = false;
    //this.updateCandidateButton=false;
    this.searchCandidatename = undefined;
    this.searchCandidateEmail = undefined;
  }

//Clear user Cookie from browser memory when logout
  logOut = () => {
    this.addcandidateService.RemoveLocalstorage('Currentuser')
  }




}
