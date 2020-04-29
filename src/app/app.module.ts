import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { TaskListComponent} from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

import { ProjectListComponent} from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';

import {MaterialDesignModule} from './material-design/material-design.module';
import { SelectionFormComponent } from './selection-form/selection-form.component';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';


import { ProjectModalComponent } from './project-modal/project-modal.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { UserModalComponent } from './user-modal/user-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    ProjectListComponent,
    ProjectFormComponent,    
    SelectionFormComponent,
    SelectionListComponent,
    UserFormComponent,
    UserListComponent,
    ProjectModalComponent,
    TaskModalComponent,
    UserModalComponent
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
