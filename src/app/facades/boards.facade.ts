import { inject, Injectable } from '@angular/core';
import { BoardStore } from '../store/boards.store';
import { Board, CreateBoard } from '../interfaces/board';

@Injectable({ providedIn: 'root' })

export class BoardsFacade {

  private _store = inject(BoardStore);

  isLoading = this._store.isLoading;
  error = this._store.error;
  boards = this._store.boards;
  selectedBoard = this._store.selectedBoard;

  fetchBoards() {
    this._store.fetchBoards();
  }

  createBoard(userId:string, board: CreateBoard){
    this._store.createBoard({userId,board});
  }

  selectBoard(selectedBoard: Board){
    this._store.selectBoard(selectedBoard.id);
  }

  updateBoard(updatedBoard: Board){
    this._store.updateBoard({updatedBoard});
  }
}