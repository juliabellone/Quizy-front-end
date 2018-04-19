import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/index';
import { LoginComponent } from './pages/login/index';
import { RegisterComponent } from './pages/register/index';
import { ProfileComponent } from './pages/profile/index';
import { RequireAnonGuard, RequireUserGuard } from './_guards/index';
import { QuizComponent } from './pages/quiz/quiz.component';
import { SelectQuizComponent } from './pages/selectquiz/selectquiz.component';
import { CreateQuizComponent } from './pages/createquiz/createquiz.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [RequireAnonGuard] },
    { path: 'login', component: LoginComponent, canActivate: [RequireAnonGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [RequireAnonGuard] },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [RequireUserGuard] },
    { path: 'selectquiz', component: SelectQuizComponent, canActivate: [RequireUserGuard] },
    { path: 'quiz/new', component: CreateQuizComponent, canActivate: [RequireUserGuard] },
    { path: 'quiz/:category', component: QuizComponent, canActivate: [RequireUserGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);