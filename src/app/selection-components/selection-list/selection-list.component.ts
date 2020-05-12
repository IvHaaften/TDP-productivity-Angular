import { Component, OnInit} from '@angular/core';
import {Task} from '../../models/task'
import {TaskService} from '../../task.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../../task-components/task-modal/task-modal.component';
import { ProjectUserService } from 'src/app/project-user.service';

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
  userID: number;
  projectIDs : number[];
  tasks: Task[];
  displayedColumns: string[] = ['name', 'project.projectName','duration', 'status', 'actions'];
  newTasks:Task[];
  startedTasks:Task[];
  comingupTasks:Task[];
  selectedTasks: Array<Task> = [];
  columnsToDisplay = ['name','duration', 'deadline', 'status'];
  expandedElement: Task | null;
  selectedProjectID: number;
  selectedTimeWindow: number;

  constructor(private taskService: TaskService, public dialog: MatDialog, private projectUserService : ProjectUserService) { }

  ngOnInit() {
    this.reloadAll()
    this.projectIDs;
    this.userID = parseInt(sessionStorage.getItem('loginId'));
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

      // copy paste stuk van Inge op selectie van tasks op basis van project nummer

      this.projectUserService.findAll().subscribe(projectUsers => {
        let filterP = new Array;
        for(let i=0; i<projectUsers.length; i++){
          if(projectUsers[i].user.id===this.userID){
            filterP.push(projectUsers[i].project.id);
          }
        }
        this.projectIDs = filterP;
        //filter all tasks to projects connected to the current user
        this.taskService.findAll().subscribe(tasks => {
          this.tasks=tasks;
          let filter = new Array;
          for (let i = 0; i < this.tasks.length; i++){
            if (this.projectIDs.includes(this.tasks[i].project.id)){
              filter.push(this.tasks[i]);
            }
          }
          this.comingupTasks = filter.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1).slice(0,5);

          var d = new Date();
          console.log(d);
          
          var c = Math.abs(<any>(new Date().getTime) - <any>(this.comingupTasks[0].deadline.getTime)); 
          console.log("Difference between two dates in days: " + c);
          console.log("Value of the first variable: " + <any>(this.comingupTasks[0].deadline.getDay));
          console.log("Value of the second variable: " + <any>(new Date().getTime));

        });
      });
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
