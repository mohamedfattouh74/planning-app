import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BoardsFacade } from '../../facades/boards.facade';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardColumnComponent } from '../../components/board-column/board-column.component';


@Component({
  selector: 'app-spaces',
  imports: [DragDropModule,BoardColumnComponent],
  templateUrl: './spaces.component.html',
  styleUrl: './spaces.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacesComponent { 

  boardsFacade = inject(BoardsFacade);

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
}
