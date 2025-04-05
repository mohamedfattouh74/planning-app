import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacade } from '../../facades/auth.facade';
import { RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { GlobalFacade } from '../../facades/global.facade';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  userEmail: string = '';
  userName: string = '';

  constructor(private authFacade: AuthFacade, public globalFacade: GlobalFacade) {}

  ngOnInit() {
    this.userEmail = this.authFacade.user().email;
    this.userName = this.generateNameFromEmail(this.userEmail);
  }

  private generateNameFromEmail(email: string): string {
    if (!email) return 'Guest';

    const namePart = email.split('@')[0];
    
    const name = namePart
      .replace(/[._]/g, ' ') 
      .replace(/(^\w|\s\w)/g, m => m.toUpperCase());

    return name || 'Guest';
  }

  getInitials(name: string): string {
    return name?.charAt(0).toUpperCase() || 'G';
  }

  logout(){
    this.authFacade.logout();
  }

  toggleTheme(){
    this.globalFacade.changeTheme();
  }
}