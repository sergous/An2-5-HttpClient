import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DialogService, CanComponentDeactivate } from './../../../core';
import { User } from './../../models/user.model';
import { UserArrayService } from './../../services/user-array.service';
import { UserObservableService } from '../../services';
import { Location } from '@angular/common';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  user: User;
  originalUser: User;
  sub: Subscription;

  constructor(
    private userObservableService: UserObservableService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // data is an observable object
    // which contains custom and resolve data
    this.route.data.subscribe(data => {
      this.user = { ...data.user };
      this.originalUser = { ...data.user };
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSaveUser() {
    const user = { ...this.user };

    const method = user.id ? 'updateUser' : 'createUser';

    this.sub = this.userObservableService[method](user).subscribe(
      () => {
        this.originalUser = { ...this.user };
        user.id
          ? this.router.navigate(['/users', { editedUserID: user.id }])
          : this.goBack();
      },
      error => console.log(error)
    );
  }

  goBack() {
    this.location.back();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = Object.keys(this.originalUser).map(key => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
