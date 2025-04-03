import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Column } from '../../interfaces/column';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-board-column',
  standalone: true,
  imports: [CdkDropList, TaskCardComponent],
  templateUrl:'./board-column.component.html',
  styleUrl:'./board-column.component.scss'
})
export class BoardColumnComponent {
  @Input() column!: Column;
  @Input() columnIndex!: number;
  @Output() dropped = new EventEmitter<CdkDragDrop<any[]>>();

  onDrop(event: CdkDragDrop<any[]>) {
    this.dropped.emit(event);
  }
}