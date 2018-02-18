import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { AngularFireModule } from 'angularfire2';
//import { AngularFireAuthModule } from 'angularfire2/auth'
//import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuard } from './_guards/auth-guard.service';

import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';

import { environment } from './../environments/environment';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './home/my-profile/my-profile.component';
import { OtherUsersComponent } from './home/other-users/other-users.component';
import { UserDetailComponent } from './home/other-users/user-detail/user-detail.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MyProfileComponent,
    OtherUsersComponent,
    UserDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [AuthGuard, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }