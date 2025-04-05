import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../reusable-components/input-reusable/input-reusable.component";
import { AuthFacade } from '../../facades/auth.facade';
import { RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../../form-validators/password-match.validator';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, FormsModule, InputComponent, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent { 

  constructor( public authFacade: AuthFacade) {}


  signupForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',Validators.required)
    }, { validators: passwordMatchValidator })
  })

  signup(){
    if(this.signupForm.valid){
      const { email, passwords} = this.signupForm.value
      if(email && passwords?.password){
        this.authFacade.register({ email, password: passwords?.password});
      }
    }
  }
}
