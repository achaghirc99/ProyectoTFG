import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router' ; 
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthenticateComponent } from './components/user-authenticate/user-authenticate.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { ComunidadComponent } from './components/comunidad/comunidad.component';

const appRoutes: Routes = [
  {path: 'authenticate', component: UserAuthenticateComponent},
  {path: 'login', component:UserLoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'comunidad', component: ComunidadComponent},
  {path: '', redirectTo: '/authenticate', pathMatch:'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    UserAuthenticateComponent,
    UserLoginComponent,
    HomeComponent,
    NavbarComponent,
    ComunidadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
