import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BoardsFacade } from '../../facades/boards.facade';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardColumnComponent } from '../../components/board-column/board-column.component';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { CreateBoardComponent } from '../../components/create-board/create-board.component';



@Component({
  selector: 'app-boards',
  imports: [DragDropModule,BoardColumnComponent,DialogModule],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent { 

  boardsFacade = inject(BoardsFacade);
  dialog = inject(Dialog);

  ngOnInit() {
    this.boardsFacade.fetchBoards();
  }

  onColumnDrop(event: CdkDragDrop<any[]>, columnIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addNewBoard(){
    this.dialog.open(CreateBoardComponent, {
      minWidth: '300px',
    });

  }
}
