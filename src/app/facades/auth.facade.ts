import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../store/auth.store';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })

export class AuthFacade {

  private _store = inject(AuthStore);

  isLogged = this._store.isLogged;
  isLoading = this._store.isLoading;
  error = this._store.error;
  user = this._store.user;

  login(credentials: User) {
    return this._store.login(credentials);
  }

  logout() {
    return this._store.logout();
  }

  getCurrentUserId() {
    return this._store.userId();
  }
}