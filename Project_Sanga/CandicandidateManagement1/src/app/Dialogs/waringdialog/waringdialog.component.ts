import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as config from '../../shared/AppConfig';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-waringdialog',
  templateUrl: './waringdialog.component.html',
  styleUrls: ['./waringdialog.component.scss']
})
export class WaringdialogComponent implements OnInit {

  constructor(private diaRef:MatDialogRef<WaringdialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private route:Router,private routeActivate:ActivatedRoute ) {

  }

  ngOnInit() {
  }

  
}
