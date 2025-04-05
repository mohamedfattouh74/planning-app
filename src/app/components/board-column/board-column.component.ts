import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Column } from '../../interfaces/column';
import { TaskCardComponent } from '../task-card/task-card.component';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';


@Component({
  selector: 'app-board-column',
  standalone: true,
  imports: [CdkDropList, TaskCardComponent, DialogModule],
  templateUrl:'./board-column.component.html',
  styleUrl:'./board-column.component.scss'
})
export class BoardColumnComponent {
  @Input() boardId! : number;
  @Input() column!: Column;
  @Input() columnIndex!: number;
  @Output() dropped = new EventEmitter<CdkDragDrop<any[]>>();

  private dialog = inject(Dialog);

  onDrop(event: CdkDragDrop<any[]>) {
    this.dropped.emit(event);
  }

  addTask(){
    this.dialog.open(CreateTaskComponent,{
      minWidth:'400px',
      data: {
        boardId:this.boardId,
        columnId: this.column.id
      }
    })
  }
}