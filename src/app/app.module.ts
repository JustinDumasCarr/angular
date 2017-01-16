import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Importing routing modules
import {RouterModule, Routes} from '@angular/router';
//import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AccountComponent } from './account/account.component';

//Services
import {AUTH_PROVIDERS} from './services/auth-service';


//Declaring the routes
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'account', component: AccountComponent},
  { path: '**', redirectTo: '/home' },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    HomepageComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes) // <-- routes
  ],
  providers: [/*{ provide: LocationStrategy, useClass: HashLocationStrategy }*/
               AUTH_PROVIDERS,
              ], //Needed for routing
  bootstrap: [AppComponent]
})
export class AppModule { }
