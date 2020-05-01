import { Component, OnInit} from '@angular/core';
import {Task} from '../task'
import {TaskService} from '../task.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.css'],
  providers:  [TaskService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class SelectionListComponent implements OnInit {

  tasks: Task[];
  displayedColumns: string[] = ['id', 'name', 'project.id','project.projectName','duration','description','status', 'actions'];
  newTasks:Task[];
  startedTasks:Task[];
  comingupTasks:Task[];
  selectedTasks: Array<Task> = [];

  columnsToDisplay = ['name','duration', 'deadline', 'status'];
  expandedElement: Task | null;
  selectedProjectID: number;
  selectedTimeWindow: number;

  constructor(private taskService: TaskService, public dialog: MatDialog) { }

  ngOnInit() {
    this.reloadAll()
  }

  reloadAll() {
    this.taskService.findAll().subscribe(tasks => {
      // Stukje code dat filtered en sorteerd voor new
      
      let newfilteredTasks = tasks.filter(task => task.project.id === this.selectedProjectID );
      newfilteredTasks = newfilteredTasks.filter(task => task.duration <= this.selectedTimeWindow);
      newfilteredTasks = newfilteredTasks.filter(task => task.status === "New");
      newfilteredTasks.sort((a, b) => (a.duration > b.duration) ? 1 : -1);
      newfilteredTasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);

      this.newTasks = newfilteredTasks.slice(0,4)

      // Stukje code dat filtered en sorteerd voor started
      let startedfilteredTasks = tasks.filter(task => task.project.id === this.selectedProjectID );
      startedfilteredTasks = startedfilteredTasks.filter(task => task.duration <= this.selectedTimeWindow);
      startedfilteredTasks = startedfilteredTasks.filter(task => task.status === "Started");
      startedfilteredTasks.sort((a, b) => (a.duration > b.duration) ? 1 : -1);
      startedfilteredTasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);

      this.startedTasks = startedfilteredTasks.slice(0,4)

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


  selectTasks(IdProject){
    this.selectedTasks = [];
    
    for (let index = 0; index < this.tasks.length; index++){
      if (this.tasks[index].project.id == IdProject){
        
        this.selectedTasks.push(this.tasks[index]);

      }

    }
  }
}
