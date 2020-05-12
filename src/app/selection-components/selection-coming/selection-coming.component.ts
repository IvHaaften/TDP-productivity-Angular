import { Component, OnInit} from '@angular/core';
import {Task} from '../../models/task'
import {TaskService} from '../../task.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../../task-components/task-modal/task-modal.component';
import { ThemeService } from 'src/app/theme.service';
import { ProjectUserService } from 'src/app/project-user.service';


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
  expandedElement: Task | null;
  theme:string;
  userID: number;
  projectIDs : number[];

  constructor(private taskService: TaskService, public dialog: MatDialog,private themeService: ThemeService, private projectUserService:ProjectUserService) { 
    this.reloadAll(); 
  }

  ngOnInit() {
    this.userID = parseInt(sessionStorage.getItem('loginId'));
    this.projectIDs;
    this.tasks;
    this.reloadAll();
  }

 reloadAll() {
    this.projectUserService.findAll().subscribe(projectUsers => {
      let filterP = new Array;
      for(let i=0; i<projectUsers.length; i++){
        // console.log("User Id list printout: " + projectUsers[i].user.id)
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
        this.tasks = filter.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
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
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data: {taskEdit : task},
      panelClass: this.theme
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.taskService.patchTask(result.id, result).subscribe(() => this.reloadAll());
    })
  }


}
