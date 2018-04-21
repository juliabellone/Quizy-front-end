import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ngfModule } from "angular-file"

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { RequireAnonGuard, RequireUserGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { 
    AlertService, 
    AuthenticationService, 
    UserService, 
    QuizService,
    FileService,
    CreateQuizService
} from './_services/index';
import { HomeComponent } from './pages/home/index';
import { LoginComponent } from './pages/login/index';
import { RegisterComponent } from './pages/register/index';
import { ProfileComponent } from './pages/profile/index';
import { QuizComponent } from './pages/quiz/quiz.component';
import { SelectQuizComponent } from './pages/selectquiz/selectquiz.component';
import { NavbarComponent } from './_components/navBar/navbar.component';
import { FileUploaderComponent } from './_components/file-uploader/file-uploader.component';
import { CreateQuizComponent } from './pages/createquiz/createquiz.component';
import { CreateQuizFormComponent } from './_components/create-quiz-form/create-quiz-form.component';
import { CreateQuestionFormComponent } from './_components/create-question-form/create-question-form.component';
import { EditUserComponent } from './pages/profile/components/edit-user/edit-user.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        ngfModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        QuizComponent,
        SelectQuizComponent,
        NavbarComponent,
        CreateQuizComponent,
        NavbarComponent,
        FileUploaderComponent,
        CreateQuizFormComponent,
        CreateQuestionFormComponent,
        EditUserComponent,
    ],
    providers: [
        RequireAnonGuard,
        RequireUserGuard,
        AlertService,
        AuthenticationService,
        UserService,
        FileService,
        CreateQuizService,
        QuizService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }