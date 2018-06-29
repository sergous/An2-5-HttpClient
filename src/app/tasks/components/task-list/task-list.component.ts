import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from './../../models/task.model';
import { TaskPromiseService, TaskArrayService } from '../../services';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Array<Task>;

  constructor(
    private router: Router,
    private taskPromiseService: TaskPromiseService,
    private taskArrayService: TaskArrayService
  ) {}

  ngOnInit() {
    this.getTasks().catch(err => console.log(err));
  }

  onCompleteTask(task: Task): void {
    this.taskArrayService.completeTask(task);
  }

  onEditTask(task: Task): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  private async getTasks() {
    this.tasks = await this.taskPromiseService.getTasks();
  }
}
