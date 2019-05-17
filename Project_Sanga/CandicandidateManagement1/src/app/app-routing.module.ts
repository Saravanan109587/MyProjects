import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import{AddcandidateComponent} from './addcandidate/addcandidate.component';
import{CandidateformComponent} from './candidateform/candidateform.component';

const routes: Routes = [
{path:'logIn',component:LoginComponent},
{path:'AddCandidate',component:AddcandidateComponent},
{path:'AddCandidateForm',component:CandidateformComponent},
{ path: '',   redirectTo: '/logIn', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RountingComponents=[
  LoginComponent,
  AddcandidateComponent



]
