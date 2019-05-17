import { Component, OnInit } from '@angular/core';
import {AddcandidateComponent} from '../../addcandidate/addcandidate.component'

@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.scss']
})
export class ConfirmationdialogComponent   implements OnInit {

   public data={
     header:'',
     body:''

   };
constructor(){
  
}
  ngOnInit() {


  }
  delete=()=>{
    console.log('Tested');
  }

}
