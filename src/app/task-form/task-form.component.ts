import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../task';
import {Project} from '../project';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  providers: [TaskService]
})
export class TaskFormComponent implements OnInit {

  @Input()
  taskList:TaskListComponent;

  task = new Task();

  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.task.project = new Project();
  }

  public save(){
    this.taskService.save(this.task).subscribe(
      () => this.taskList.reloadAll()
    );
  }

  clear(){
    this.task.name = '';
    }


}
