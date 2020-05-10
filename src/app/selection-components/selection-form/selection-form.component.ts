import { Component, OnInit,Input } from '@angular/core';
import{Selection} from '../../models/selection';
import {SelectionListComponent} from '../selection-list/selection-list.component';
import {Task} from '../../models/task'
import { TaskService } from '../../task.service';
import { Project } from '../../models/project';
import { ProjectService } from '../../project.service';
import {LoginService} from '../../login.service'
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-selection-form',
  templateUrl: './selection-form.component.html',
  styleUrls: ['./selection-form.component.css'],
  providers: [TaskService]
})
export class SelectionFormComponent implements OnInit {
  
  @Input()
  list:SelectionListComponent
  
  projectNumber: number;
  timeWindow: number;
  
  projects: Project[];
  filteredProjects: Project[];
  tasks: Task[];
  
  important: Task[];
  
  userID: number;
  user: User;
  
  constructor(private projectService: ProjectService, private taskService:TaskService, public userService : UserService) { }
  
  ngOnInit(): void {
    this.projects;
    this.filteredProjects;
    this.projectNumber;
    this.timeWindow;
    this.userID = parseInt(sessionStorage.getItem('loginId'));
    //this.userService.findAll().subscribe(users =>{this.user=users.find(user => user.id === this.userID)});
    this.reloadAll();
    this.priority();
  }
  
  reloadAll(){
    this.projectService.findAll().subscribe(projects => {
      this.projects=projects;
      let filter = new Array;
      for (let indexp = 0; indexp < this.projects.length; indexp++){
        console.log(this.projects[indexp].projectName);
        for (let indexu =0; indexu < this.projects[indexp].users.length; indexu++){
          if (this.projects[indexp].users[indexu].user.id === this.userID){
            filter.push(this.projects[indexp]);
          }
        }
      }
      this.filteredProjects = filter;
    });
  }
  
  priority(){
    this.taskService.findAll().subscribe(tasks => {
      this.important = tasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
      this.important = this.important.slice(0,2);
    });
  }
  
  clear(){
    this.list.selectedProjectID = this.projectNumber;
    this.list.selectedTimeWindow = this.timeWindow;
    this.projectNumber = 0;
    this.timeWindow = null;
    this.list.reloadAll();
  }
  
  delete(){
    this.list.selectedProjectID = 0;
    this.list.selectedTimeWindow = 0;
    this.list.reloadAll();
  }
  
}
