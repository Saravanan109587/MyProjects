import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as config from '../../shared/AppConfig';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.scss']
})
export class ErrordialogComponent implements OnInit {

  constructor(private diaRef:MatDialogRef<ErrordialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private route:Router,private routeActivate:ActivatedRoute ) {

  }

  ngOnInit() {
  }

}
