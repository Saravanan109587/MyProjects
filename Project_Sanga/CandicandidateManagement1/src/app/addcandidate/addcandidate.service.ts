import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { ICandidate, IDepartments } from '../Interface/Candidate.interface';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import * as config from '../shared/AppConfig'
//import 'rxjs/observable/throw';


@Injectable()
export class AddcandidateService {

  constructor(private http: HttpClient) { }
  adddCandidate = (candidateDetail: ICandidate): any => {

    return this.http.post(config.appConfig.apiservice + 'CandidateDetail/AddCandidateDetail', candidateDetail, { headers: { 'Content-Type': 'application/json' } })
      .catch(this.ErrorHandler)
  }


  GetAllDepartments = (): Observable<string[]> => {

    return this.http.get(config.appConfig.apiservice + 'CandidateDetail/GetAllDepartments')
      // .map((response:Response)=><string[]>response.json())

      .catch(this.ErrorHandler)
  }



  searchCandidate = (name: string, email: string): any => {


    return this.http.get(config.appConfig.apiservice + 'CandidateDetail/SearchCandidateDetail?Name=' + name + '&Email=' + email, { headers: { 'Content-Type': 'application/json' } })
      .catch(this.ErrorHandler)

  }

 
  UpdateCandidates = (candidate: ICandidate): any => {

    return this.http.post(config.appConfig.apiservice + 'CandidateDetail/UpdateCandidateDetail', candidate, { headers: { 'Content-Type': 'application/json' } })
      .catch(this.ErrorHandler)
  }

  deleteCandidates = (email: string): any => {

    return this.http.get(config.appConfig.apiservice + 'CandidateDetail/DeleteCandidateDetail?Email=' + email, { headers: { 'Content-Type': 'application/json' } })
      .catch(this.ErrorHandler)
  }





  checkCandidatenullvalue = (candidate: ICandidate): ICandidate => {
    candidate.UpdateId = config.ValidAdmin.username;
    if (!candidate.Experience) {
      candidate.Experience = 0;

    }
    if (!candidate.CurrentCTC) {
      candidate.CurrentCTC = 0;

    }
    if (!candidate.ExpectedCTC) {
      candidate.ExpectedCTC = 0;

    }
    if (!candidate.NoticePeriod) {
      candidate.NoticePeriod = 0;

    }
    if (!candidate.Interviewer) {
      candidate.Interviewer = "";

    }
    if (!candidate.CommentsfromInterviewer) {
      candidate.CommentsfromInterviewer = "";

    }
    if (!candidate.CandidateId) {
      candidate.CandidateId =0;

    }
    if (!candidate.UpdateDate) {
      candidate.UpdateDate = new Date();

    }
    if (!candidate.CommentsfromHR) {
      candidate.CommentsfromHR = "";
    }
    if (!candidate.Status) {
      candidate.Status = "";
    }
    if (!candidate.LastName) {
      candidate.LastName = "";
    }
    return candidate;
  }


  MakeCandidatenullvalue = (candidate: ICandidate): ICandidate => {
    candidate.UpdateId = config.ValidAdmin.username;
    if (candidate.Experience == 0) {
      candidate.Experience =undefined;

    }
    if (candidate.CurrentCTC==0) {
      candidate.CurrentCTC = undefined;

    }
    if (candidate.ExpectedCTC==0) {
      candidate.ExpectedCTC = undefined;

    }
    if (candidate.NoticePeriod==0) {
      candidate.NoticePeriod = undefined;

    }
     
    return candidate;
  }









  RemoveLocalstorage = (name: string) => {
    localStorage.removeItem(name);
  }


  ErrorHandler = (err: Response) => {
    return Observable.throw(err);
  }










}
