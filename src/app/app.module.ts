import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';

import { ngfModule } from "angular-file"
import { StarRatingModule } from 'angular-star-rating';
import { ImageCropperModule } from 'ng2-img-cropper';

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
    CreateQuizService,
    RankingService,
    RatingService
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
import { FooterComponent } from './_components/footer/footer.component';
import { QuizresultComponent } from './components/quizresult/quizresult.component';
import { ChallengeComponent } from './_components/challenge/challenge.component';
import { SearchUsersComponent } from './_components/search-users/search-users.component';
import { UnauthorizedInterceptor } from './_helpers/unauthorized.interceptor';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        ngfModule,
        StarRatingModule.forRoot(),
        ImageCropperModule,
        BrowserModule,
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
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
        FooterComponent,
        QuizresultComponent,
        ChallengeComponent,
        SearchUsersComponent,
    ],
    providers: [
        RequireAnonGuard,
        RequireUserGuard,
        AlertService,
        AuthenticationService,
        UserService,
        FileService,
        CreateQuizService,
        RankingService,
        QuizService,
        RatingService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }