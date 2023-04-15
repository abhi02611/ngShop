import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { catchError, concatMap, map } from 'rxjs/operators';
import { LocalstorageService } from '../services/localstorage.service';
import { of } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localstorageService.isValidToken()) {
          console.log("token is valid");
          const userId = this.localstorageService.getUserIdFromToken();
          console.log('userId', userId);
          if (userId) {
            return this.usersService.getUser(userId).pipe(
              map((user) => {
                console.log('user', user);
                return UsersActions.buildUserSessionSuccess({ user: user });
              }),
              catchError(() => of(UsersActions.buildUserSessionFailed()))
            );
          } else {
            return of(UsersActions.buildUserSessionFailed());
          }
        } else {
          return of(UsersActions.buildUserSessionFailed());
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private localstorageService: LocalstorageService,
    private usersService: UsersService
  ) {}
}
