import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Board, CreateBoard } from "../interfaces/board"
import { computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { BoardsService } from "../services/boards.service";
import { AuthFacade } from "../facades/auth.facade";

type BoardState = {
    boards: Board[],
    selectedBoard: Board | null,
    isLoading: boolean,
    error : string | null
}

const initialState : BoardState = {
    boards: [],
    selectedBoard: null,
    isLoading : false,
    error: null
}

export const BoardStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((store)=>({
        boardsCount: computed(() => store.boards().length)
    })),
    withMethods((store, boardService = inject(BoardsService), authFacade = inject(AuthFacade))=>({
        fetchBoards: rxMethod<void>(
            pipe(
                tap(()=>patchState(store,{isLoading:true , error: null})),
                switchMap(() => boardService.getBoards(authFacade.getCurrentUserId()).pipe(
                    tap({
                        next: (res)=> {
                            patchState(store, {boards: res, isLoading: false, })
                        },  
                        error: () => { patchState(store, {isLoading: false, error:'Failed to fetch boards '})},
                        })
                ))
            )
        ),
        createBoard: rxMethod<{userId:string, board:CreateBoard}>(
            pipe(
                tap(()=>patchState(store,{isLoading:true , error: null})),
                switchMap(({userId,board}) => boardService.createBoard(userId,board ).pipe(
                    tap({
                        next: (res)=> {
                            patchState(store, {boards: [...store.boards(), res] , isLoading: false, })
                        },  
                        error: () => { patchState(store, {isLoading: false, error:'Failed to create board '})},
                        })
                ))
            )
        ),
        selectBoard: (boardId: number) => {
            const board = store.boards().find(b => b.id === boardId);
            patchState(store, { selectedBoard: board || null });        
        },
        clearSelection: () => {
            patchState(store, { selectedBoard: null });
        }
    })
))