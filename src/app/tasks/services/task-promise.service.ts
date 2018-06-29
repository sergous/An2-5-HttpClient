import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable()
export class TaskPromiseService {
  tasksUrl: string = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Promise<Task[]> {
    return this.http
      .get(this.tasksUrl)
      .toPromise()
      .then(response => <Task[]>response)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
