import {Component, OnInit, Input, Inject} from '@angular/core';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {Project} from '../project';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

export interface TaskModalData {
  taskEdit: Task;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers:  [TaskService]
})
export class TaskListComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.reloadAll();
  }

  reloadAll() {
    this.taskService.findAll().subscribe(tasks => this.tasks = tasks);
  }
  
  delete(id: number) {
    this.taskService.delete(id).subscribe(
      () => this.reloadAll()
    );
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskEditModal, {
      width: '50%',
      data: {taskEdit : task}
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.taskService.patchTask(result.id, result).subscribe(() => this.reloadAll());
    })
  }
}

@Component({
  selector: 'task-edit-modal',
  templateUrl: 'task-edit-modal.html',
})
export class TaskEditModal {
  
  @Input()
  taskEdit: Task;
  
  constructor(public dialogRef: MatDialogRef<TaskEditModal>,
    @Inject(MAT_DIALOG_DATA) public data: TaskModalData) {}
  
}