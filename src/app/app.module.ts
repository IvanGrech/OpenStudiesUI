import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AuthService } from './auth.service';
import {
  RoleGuardService as RoleGuard
} from './role-guard.service';
import { SignupComponent } from './signup/signup.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent,  data: { title: 'Login' } },
  { path: 'signup', component: SignupComponent,  data: { title: 'Signup' } },
  { path: 'home', component: UserPageComponent,canActivate: [RoleGuard], data: { title: 'Home', expectedRole: 'user' } },
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
  { path: '**', component: PageNotFoundComponent }

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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [UserService, AuthService, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
