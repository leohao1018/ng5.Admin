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
import {AdminSystemDynamicComponent} from "../admin-system-dynamic/admin-system-dynamic.component";
import {AdminAddSystemDynamicComponent} from "../admin-system-dynamic/admin-add-system-dynamic/admin-add-system-dynamic.component";
import {AdminComplainComponent} from "../admin-complain/admin-complain.component";

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
                path: 'list',
                component: AdminClassesComponent
              },
              {
                path: 'info',
                component: AdminAddClassComponent
              }
            ],
          },
          {
            path: 'systemDynamic',
            children: [
              {
                path: 'list',
                component: AdminSystemDynamicComponent
              },
              {
                path: 'info',
                component: AdminAddSystemDynamicComponent
              }
            ],
          },
          {
            path: 'complain',
            children: [
              {
                path: 'list',
                component: AdminComplainComponent
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
