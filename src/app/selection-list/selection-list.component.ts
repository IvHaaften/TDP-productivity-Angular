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

  displayedColumns: string[] = ['id'];

  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.reloadAll()
  }

  reloadAll() {
    this.taskService.findAll().subscribe(tasks => {
      
      let filteredTasks = tasks.filter(task => task.project.id === this.selectedProjectID ).sort().slice(0,3);
      filteredTasks = filteredTasks.filter(task => task.duration <= this.selectedTimeWindow);
      this.tasks = filteredTasks} );
  }

  // .slice(1,3) 
  // .sort()

  
  delete(id) {
    this.taskService.delete(id).subscribe(
      () => this.reloadAll()
    );
  }
}
