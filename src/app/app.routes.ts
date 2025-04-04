import { Routes } from '@angular/router';
import { SpacesComponent } from './pages/spaces/spaces.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path :'', component :LayoutComponent, children:[
        { path:'spaces', component: SpacesComponent, canActivate:[authGuard]},
    ]},
    {path:'spaces', component: SpacesComponent, canActivate:[authGuard]},
    {path:'', redirectTo:'login', pathMatch:'full'},
];
