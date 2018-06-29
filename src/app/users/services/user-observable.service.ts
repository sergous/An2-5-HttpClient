import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersAPI } from '../users.config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class UserObservableService {
  constructor(
    private http: HttpClient,
    @Inject(UsersAPI) private usersUrl: string
  ) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError));
  }

  getUser(id: number) {}
  updateUser(user: User) {}
  createUser(user: User) {}
  deleteUser(user: User) {}

  handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof Error) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}, body was: ${
        err.error
      }`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
