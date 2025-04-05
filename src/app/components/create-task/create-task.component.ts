import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../reusable-components/input-reusable/input-reusable.component";
import { DynamicSelectComponent } from "../../reusable-components/dynamic-select/dynamic-select.component";
import { Task } from '../../interfaces/task';
import { BoardsFacade } from '../../facades/boards.facade';
import { Board } from '../../interfaces/board';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputComponent, DynamicSelectComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent {
  dialogRef = inject(DialogRef);
  dialogData = inject(DIALOG_DATA);
  boardsFacade = inject(BoardsFacade);

  priorityOptions = ['low', 'medium', 'high'];

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    priority: new FormControl('low', Validators.required),
    date: new FormControl('', Validators.required)
  });

  createTask() {
    if (this.taskForm.invalid) return;

    const { title, date, priority } = this.taskForm.value;
    const currentBoard = this.boardsFacade.selectedBoard();

    if (!currentBoard || !title || !date || !priority) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      dueDate: date,
      priority: priority,
    };

    const updatedBoard: Board = {
      ...currentBoard,
      columns: currentBoard.columns.map(column => 
        column.id === this.dialogData.columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      ),
    };

    this.boardsFacade.updateBoard(updatedBoard);
    this.dialogRef.close();
  }
}