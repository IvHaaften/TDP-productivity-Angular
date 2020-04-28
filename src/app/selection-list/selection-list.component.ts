import { Component, OnInit, Input} from '@angular/core';
import {Task} from '../task'
import {TaskService} from '../task.service';
import {SelectionFormComponent} from '../selection-form'


@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css'],
  providers:  [TaskService]
})
export class SelectionListComponent implements OnInit {
  
  @Input()
  form:SelectionFormComponent


  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.form.projectNumber
    this.form.timeWindow
    this.reloadAll()
  }

  reloadAll() {
    this.taskService.findAll().subscribe(tasks => this.tasks = tasks);

    // .filter().filter().filter()
  }
  
  delete(id) {
    this.taskService.delete(id).subscribe(
      () => this.reloadAll()
    );
  }

}
