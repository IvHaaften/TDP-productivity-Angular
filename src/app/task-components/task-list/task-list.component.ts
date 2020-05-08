import {Component, OnInit, Input, AfterContentInit} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../../task.service';
import { UserListComponent } from '../../user-components/user-list/user-list.component';

import {MatDialog} from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ThemeService } from '../../theme.service';

export interface TaskModalData {
  taskEdit: Task;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers:  [TaskService]
})
 

export class TaskListComponent implements OnInit, AfterContentInit {
  

  tasks: Task[];
  theme:string;
  displayedColumns: string[] = ['id', 'name', 'project.id','project.projectName','duration','description','status', 'actions'];

  selectedTasks: Array<Task> = [];

  tempTask: Task;

    @Input()
    userIdProject: UserListComponent


  constructor(private taskService: TaskService, public dialog: MatDialog, private themeService: ThemeService) {
    this.reloadAll();
    this.userIdProject;
    this.selectedTasks = this.tasks
  }
  
  ngOnInit() {
    console.log("printout from ngOnInit start")
    this.reloadAll();
    this.userIdProject;
    this.selectedTasks = this.tasks

    console.log("after initialisation from ngonInit")

    this.selectTasks(this.userIdProject)
    
    console.log("printout from ngOnInit end")
  }

  ngAfterContentInit(){
    console.log("printout from ngAfterContentInit 1")
    console.log("value of userIdProject" + this.userIdProject)
    this.selectTasks(this.userIdProject)
    console.log("finished select Tasks function")
    this.reloadAll();
  }

  reloadAll() {
    this.taskService.findAll().subscribe(tasks => this.tasks = tasks);
  }
  
  delete(id: number) {
    this.taskService.delete(id).subscribe(() => this.reloadAll());
  }

  startTask(startedTask: Task){
    startedTask.status="Started";
    this.taskService.patchTask(startedTask.id, startedTask).subscribe(() => this.reloadAll());
  }

  closeTask(closedTask: Task){
    closedTask.status="Closed";
    this.taskService.patchTask(closedTask.id, closedTask).subscribe(() => this.reloadAll());

  }
  
  editTask(task: Task) {
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data: {taskEdit : task},
      panelClass: this.theme,
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.taskService.patchTask(result.id, result).subscribe(() => this.reloadAll());
    })
  }


  selectTasks(IdProject){
    this.selectedTasks = [];
    
    for (let index = 0; index < this.tasks.length; index++){
      if (this.tasks[index].project.id == IdProject){
        
        this.selectedTasks.push(this.tasks[index]);

      }

    }
  }
  

}