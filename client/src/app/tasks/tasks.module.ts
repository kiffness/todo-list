import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { FormsModule } from '@angular/forms'

import { TaskListComponent } from './task-list.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatDatepickerModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    TaskListComponent
  ]
})
export class TasksModule { }
