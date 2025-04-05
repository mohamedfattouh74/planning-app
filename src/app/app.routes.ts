import { Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent },
    {path :'', component : LayoutComponent, children:[
        { path:'boards', component: BoardsComponent, canActivate:[authGuard]},
    ]},
];
