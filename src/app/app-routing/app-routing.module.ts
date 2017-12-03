// import { StarterComponentntponent } from './../starter/starter.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AdminContentComponent} from '../admin/admin-content/admin-content.component';
import {AdminDashboard2Component} from '../admin/admin-dashboard2/admin-dashboard2.component';
import {AdminDashboard1Component} from '../admin/admin-dashboard1/admin-dashboard1.component';
import {AdminComponent} from '../admin/admin.component';
import {StarterComponent} from '../starter/starter.component';
import {StarterContentComponent} from '../starter/starter-content/starter-content.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
