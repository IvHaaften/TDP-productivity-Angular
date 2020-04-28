import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { TaskListComponent, TaskEditModal } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

import { ProjectListComponent, ProjectEditModal } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialDesignModule} from './material-design/material-design.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskEditModal,
    ProjectListComponent,
    ProjectFormComponent,

    ProjectEditModal

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    NgbModule
  ],
  exports: [
    MaterialDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }
