import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  UsersRoutingModule,
  usersRouterComponents,
} from './users-routing.module';

import {
  UserComponent,
  UserArrayService,
  UserResolveGuard,
  UserObservableService,
} from '.';
import { SharedModule } from './../shared/shared.module';
import { UsersAPIProvider } from './users.config';

@NgModule({
  imports: [CommonModule, FormsModule, UsersRoutingModule, SharedModule],
  declarations: [usersRouterComponents, UserComponent],
  providers: [
    UserArrayService,
    UserResolveGuard,
    UsersAPIProvider,
    UserObservableService,
  ],
})
export class UsersModule {}
