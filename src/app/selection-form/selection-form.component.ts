import { Component, OnInit,Input } from '@angular/core';
import{Selection} from '../selection';
import {SelectionListComponent} from '../selection-list/selection-list.component';
import { SelectionService } from '../selection.service';

@Component({
  selector: 'app-selection-form',
  templateUrl: './selection-form.component.html',
  styleUrls: ['./selection-form.component.css'],
  providers: [SelectionService]
})
export class SelectionFormComponent implements OnInit {

  selection = new Selection();

  // constructor(private selectionService: SelectionService) { }

  ngOnInit(): void {
  }

  // public save() {
   
  // }

  clear(){
    this.selection.projectNumber = null;
    this.selection.timeWindow = null;
    
    }

}
