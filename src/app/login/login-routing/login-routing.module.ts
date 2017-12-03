import {NgModule, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginComponent} from '../login.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
        children: [
          {
            path: '',
            component: LoginComponent
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {
}
