import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/index';
import { LoginComponent } from './pages/login/index';
import { RegisterComponent } from './pages/register/index';
import { ProfileComponent } from './pages/profile/index';
import { RequireAnonGuard, RequireUserGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [RequireUserGuard] },
    { path: 'login', component: LoginComponent, canActivate: [RequireAnonGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [RequireAnonGuard] },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [RequireUserGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);