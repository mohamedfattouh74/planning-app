import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthFacade } from '../../facades/auth.facade';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../reusable-components/input-reusable/input-reusable.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, InputComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required)
  })

  authFacade = inject(AuthFacade);

  login() {
    if(this.loginForm.valid){
      const { email,password } = this.loginForm.value
      if(email && password){
        this.authFacade.login({email,password});
      }
    }
  }
}
