import { Component, OnInit,Input } from '@angular/core';
import{Selection} from '../selection';
import {SelectionListComponent} from '../selection-list/selection-list.component';
import { SelectionService } from '../selection.service';
import {Task} from '../task'
import { TaskService } from '../task.service';

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
  timeWindow: Date;

  tasks: Task[];

  // constructor(private selectionService: SelectionService) { }

  ngOnInit(): void {
    this.projectNumber
    this.timeWindow
  }

  clear(){
    this.list.selectedProjectID = this.projectNumber;
    this.list.selectedTimeWindow = this.timeWindow;
    this.projectNumber = 0;
    this.timeWindow = null;
    this.list.reloadAll();
    
    }
}
