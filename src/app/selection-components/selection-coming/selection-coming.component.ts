import { Component, OnInit} from '@angular/core';
import {Task} from '../../models/task'
import {TaskService} from '../../task.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../../task-components/task-modal/task-modal.component';


@Component({
  selector: 'app-selection-coming',
  templateUrl: './selection-coming.component.html',
  styleUrls: ['./selection-coming.component.css'],
  providers:  [TaskService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class SelectionComingComponent implements OnInit {

  tasks: Task[];
  displayedColumns: string[] = ['name', 'project.projectName','duration', 'status', 'actions'];
  comingupTasks:Task[];
  columnsToDisplay = ['name','duration', 'deadline', 'status'];
  expandedElement: Task | null;

  constructor(private taskService: TaskService, public dialog: MatDialog) { }

  ngOnInit() {
    this.reloadAll()
  }

  reloadAll() {
    this.taskService.findAll().subscribe(tasks => {
      //Stukje code dat filtered en sorteerd voor coming up
      let comingupfilteredTasks = tasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
      this.comingupTasks = comingupfilteredTasks.slice(0,4)
    });
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
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data: {taskEdit : task}
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.taskService.patchTask(result.id, result).subscribe(() => this.reloadAll());
    })
  }


}
