import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'view', component: ViewComponent },

];
@NgModule({
  declarations: [],
  imports: [
    
    CommonModule,RouterModule.forChild(routes)
  ],  exports: [RouterModule]
})
export class UsersRoutingModule { }
