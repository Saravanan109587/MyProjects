import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as config from '../../shared/AppConfig';
import {Router, ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-successdialog',
  templateUrl: './successdialog.component.html',
  styleUrls: ['./successdialog.component.scss']
})
export class SuccessdialogComponent implements OnInit {

  constructor(private diaRef:MatDialogRef<SuccessdialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private route:Router,private routeActivate:ActivatedRoute ) {

   }

  ngOnInit() {
  }
  navigate=()=>{
if(config.ActiveCandidate.Name=='admin'){
  this.route.navigate(["/AddCandidate"],{ relativeTo: this.routeActivate })
}
else{
  this.route.navigate(["/AddCandidateForm"],{ relativeTo: this.routeActivate })

}

  }

}
