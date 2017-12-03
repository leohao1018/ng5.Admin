import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing/login-routing.module';
import {FormsModule} from '@angular/forms';
import {LoginService} from './login.service';
import {AuthService} from './auth-service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginService,
    AuthService,
  ],
  exports: [LoginComponent]
})
export class LoginModule {
}
