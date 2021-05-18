import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserPageComponent} from './components/user/user-page/user-page.component';
import {LoginComponent} from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {AddComponent} from './components/add/add.component';
import {EditComponent} from './components/edit/edit.component';
import {AuthService} from './services/auth.service';
import {
  RoleGuardService as RoleGuard
} from './services/role-guard.service';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import {SignupComponent} from './components/signup/signup.component';
import {RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {CreateCourseDialogComponent} from './components/misc/create-course-dialog/create-course-dialog.component';
import {CourseService} from './services/course.service';
import {CoursesListComponent} from './components/courses-list/courses-list.component';
import {LoadingSpinnerComponent} from './components/misc/loading-spinner/loading-spinner.component';
import {CourseInfoComponent} from './components/course-info/course-info.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CreateTaskDialogComponent} from './components/misc/create-task-dialog/create-task-dialog.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import { CourseCardComponent } from './components/course-card/course-card.component';
import { SubscribeDialogComponent } from './components/misc/subscribe-dialog/subscribe-dialog.component';
import { SubscribedCourseComponent } from './subscribed-course/subscribed-course.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'signup', component: SignupComponent, data: {title: 'Signup'}},
  {path: 'home', component: UserPageComponent, canActivate: [RoleGuard], data: {title: 'Home', expectedRole: 'user'}},
  {path: 'mycourses', component: CoursesListComponent, data: {title: 'My Courses'}},
  {path: 'course', component: CourseInfoComponent, data: {title: 'Course'}},
  {path: 'subscribed-course', component: SubscribedCourseComponent, data: {title: 'Course'}},
  {
    path: 'admin/add', component: AddComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/edit', component: EditComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin', component: AdminHomeComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    UserPageComponent,
    LoginComponent,
    PageNotFoundComponent,
    AdminHomeComponent,
    AddComponent,
    EditComponent,
    SignupComponent,
    CreateCourseDialogComponent,
    CoursesListComponent,
    LoadingSpinnerComponent,
    CourseInfoComponent,
    CreateTaskDialogComponent,
    CourseCardComponent,
    SubscribeDialogComponent,
    SubscribedCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule
  ],
  entryComponents: [
    CreateCourseDialogComponent,
    CreateTaskDialogComponent,
    SubscribeDialogComponent
  ],
  providers: [CourseService, UserService, AuthService, RoleGuard, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
