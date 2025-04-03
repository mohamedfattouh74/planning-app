import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthFacade } from '../../facades/auth.facade';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  authFacade = inject(AuthFacade);

  login() {
    this.authFacade.login({email:'mohamed@gmail.com',password:'123456'});
  }
}
