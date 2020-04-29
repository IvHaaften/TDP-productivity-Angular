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

import {MaterialDesignModule} from './material-design/material-design.module';
import { SelectionFormComponent } from './selection-form/selection-form.component';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskEditModal,
    ProjectListComponent,
    ProjectFormComponent,    
    ProjectEditModal,
    SelectionFormComponent,
    SelectionListComponent,
    UserFormComponent,
    UserListComponent,
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
