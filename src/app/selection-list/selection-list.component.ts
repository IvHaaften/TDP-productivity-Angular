import { Component, OnInit } from '@angular/core';
import {Task} from '../task'
import {TaskService} from '../task.service';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css'],
  providers:  [TaskService]
})
export class SelectionListComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.reloadAll()
  }

  reloadAll() {
    this.taskService.findAll().subscribe(tasks => this.tasks = tasks);
  }
  
  delete(id) {
    this.taskService.delete(id).subscribe(
      () => this.reloadAll()
    );
  }

}
