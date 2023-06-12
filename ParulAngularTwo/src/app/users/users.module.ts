import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserdataService } from '../services/userdata.service';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [CreateComponent, ViewComponent],
  imports: [CommonModule, ReactiveFormsModule, UsersRoutingModule],
})
export class UsersModule {
  constructor(private userdata: UserdataService) {}
}
