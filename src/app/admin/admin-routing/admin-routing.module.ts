import {AdminDashboard2Component} from './../admin-dashboard2/admin-dashboard2.component';
import {AdminDashboard1Component} from './../admin-dashboard1/admin-dashboard1.component';
import {AdminComponent} from './../admin.component';
import {NgModule, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminContentComponent} from '../admin-content/admin-content.component';

import {AdminClassesComponent} from '../admin-classes/admin-classes.component';
import {AdminAddClassComponent} from '../admin-classes/admin-add-class/admin-add-class.component';
import {LoggedInGuard} from '../../login/logged-in-guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: 'dashboard1',
            component: AdminDashboard1Component
          },
          {
            path: 'dashboard2',
            component: AdminDashboard2Component
          },
          {
            path: 'content',
            component: AdminContentComponent
          },
          {
            path: 'class',
            children: [
              {
                path: 'classes',
                component: AdminClassesComponent
              },
              {
                path: 'addClass',
                component: AdminAddClassComponent
              }
            ],
          }
        ],
        canActivate: [LoggedInGuard]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
