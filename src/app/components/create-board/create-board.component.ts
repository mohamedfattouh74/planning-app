import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InputComponent } from "../../reusable-components/Input/input-reusable.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoardsFacade } from '../../facades/boards.facade';
import { AuthFacade } from '../../facades/auth.facade';
import { CreateBoard } from '../../interfaces/board';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-board',
  imports: [InputComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBoardComponent { 

  boardFacade = inject(BoardsFacade);
  authFacade = inject(AuthFacade);
   dialogRef = inject (DialogRef);

  boardForm = new FormGroup({
    title: new FormControl('', Validators.required)
  })

  createBoard(){
    if(this.boardForm.valid && this.boardForm.value.title){
      
      const board: CreateBoard = {
        title  :this.boardForm.value.title,
        userId : this.authFacade.getCurrentUserId(),
        columns: [
          {
            id: `col-${Date.now()}-1`,
            title: 'To Do',
            tasks: []
          },
          {
            id: `col-${Date.now()}-2`,
            title: 'In Progress',
            tasks: []
          },
          {
            id: `col-${Date.now()}-3`,
            title: 'Done',
            tasks: []
          }
        ]    
      }
      this.boardFacade.createBoard(this.authFacade.getCurrentUserId(),board);
      this.dialogRef.close();
    }
  }
}
