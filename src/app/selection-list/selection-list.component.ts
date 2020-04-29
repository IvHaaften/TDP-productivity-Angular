import { Component, OnInit, Input} from '@angular/core';
import {Task} from '../task'
import {TaskService} from '../task.service';
import {SelectionFormComponent} from '../selection-form/selection-form.component'
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css'],
  providers:  [TaskService]
})
export class SelectionListComponent implements OnInit {

  selectedProjectID: number;
  selectedTimeWindow: number;

  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.reloadAll()
  }

  reloadAll() {
    this.taskService.findAll().subscribe(tasks => {
      
      let filteredTasks = tasks.filter(task => task.project.id === this.selectedProjectID );
      filteredTasks = filteredTasks.filter(task => task.duration <= this.selectedTimeWindow);
      filteredTasks.sort((a, b) => (a.duration > b.duration) ? 1 : -1)
      this.tasks = filteredTasks.slice(0,4)} );
  }

  // .slice(1,3) 
  // .sort()

  
  delete(id) {
    this.taskService.delete(id).subscribe(
      () => this.reloadAll()
    );
  }
}
