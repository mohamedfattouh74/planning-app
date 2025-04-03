import { inject, Injectable } from '@angular/core';
import { BoardStore } from '../store/boards.store';

@Injectable({ providedIn: 'root' })

export class BoardsFacade {

  private _store = inject(BoardStore);

  isLoading = this._store.isLoading;
  error = this._store.error;
  boards = this._store.boards;

  fetchBoards() {
    this._store.fetchBoards();
  }
}