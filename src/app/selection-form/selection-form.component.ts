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

  selection = new Selection();
  tasks: Task[];

  // constructor(private selectionService: SelectionService) { }

  ngOnInit(): void {
  }

  clear(){
    this.selection.projectNumber = null;
    this.selection.timeWindow = null;
    
    }
}
