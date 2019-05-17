import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as config from '../shared/AppConfig';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { 

  }
  getvalidAdmin():any
  {
     
  return  this.http.get<string>(config.appConfig.apiservice+"CandidateDetail/getValidAdmin") 
  .catch(this.ErrorHandler)

}
  validateLogin(username:string,Email:string):any
  {
     
  return  this.http.get<string>(config.appConfig.apiservice+"CandidateDetail/ValidateCandidateDetail?name="+username+"&email="+Email) 
  .catch(this.ErrorHandler)

}
ErrorHandler=(err)=>{
return  Observable.throw(err.message ||"error");
}
}
