import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { delay, map, catchError, finalize } from 'rxjs/operators';

import { User } from './../models/user.model';
import { UserObservableService } from './../services';
import { SpinnerService } from './../../core';

@Injectable()
export class UserResolveGuard implements Resolve<User> {
  constructor(
    private userObservableService: UserObservableService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User | null> {
    console.log('UserResolve Guard is called');

    if (!route.paramMap.has('userID')) {
      return of(new User(null, '', ''));
    }

    this.spinner.show();
    const id = +route.paramMap.get('userID');

    return this.userObservableService.getUser(id).pipe(
      delay(2000),
      map(user => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/users']);
          return of(null);
        }
      }),
      catchError(() => {
        this.router.navigate(['/users']);
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
