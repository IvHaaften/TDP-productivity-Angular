import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { TaskListComponent} from './task-components/task-list/task-list.component';
import { TaskFormComponent } from './task-components/task-form/task-form.component';

import { ProjectListComponent} from './project-components/project-list/project-list.component';
import { ProjectFormComponent } from './project-components/project-form/project-form.component';

import {MaterialDesignModule} from './material-design/material-design.module';
import { SelectionFormComponent } from './selection-components/selection-form/selection-form.component';
import { SelectionListComponent } from './selection-components/selection-list/selection-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserFormComponent } from './user-components/user-form/user-form.component';
import { UserListComponent } from './user-components/user-list/user-list.component';


import { ProjectModalComponent } from './project-components/project-modal/project-modal.component';
import { TaskModalComponent } from './task-components/task-modal/task-modal.component';
import { UserModalComponent } from './user-components/user-modal/user-modal.component';
import { UserLoginComponent } from './user-components/user-login/user-login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomepageComponent } from './routing-pages/homepage/homepage.component';
import { SelectPageComponent } from './routing-pages/select-page/select-page.component';
import { ListPageComponent } from './routing-pages/list-page/list-page.component';
import { SelectionComingComponent } from './selection-components/selection-coming/selection-coming.component';



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
    UserModalComponent,
    UserLoginComponent,
    ToolbarComponent,
    HomepageComponent,
    SelectPageComponent,
    ListPageComponent,
    SelectionComingComponent
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
