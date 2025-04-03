import { Routes } from '@angular/router';
import { SpacesComponent } from './pages/spaces/spaces.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'spaces', component: SpacesComponent, canActivate:[authGuard]},
    {path:'', redirectTo:'spaces', pathMatch:'full'},
];
