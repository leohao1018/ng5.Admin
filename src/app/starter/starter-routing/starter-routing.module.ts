import {NgModule, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {StarterComponent} from '../starter.component';
import {StarterContentComponent} from '../starter-content/starter-content.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'starter',
        component: StarterComponent,
        children: [
          {
            path: '',
            redirectTo: 'content',
            pathMatch: 'full'
          },
          {
            path: 'content',
            component: StarterContentComponent
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class StarterRoutingModule {
}
