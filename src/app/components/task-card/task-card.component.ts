import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [CdkDrag,NgClass,TitleCasePipe],
  templateUrl: `./task-card.component.html`,
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent { 

  @Input() task!: Task;

}
