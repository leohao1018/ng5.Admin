import {FormsModule} from '@angular/forms';

import {AdminRoutingModule} from './admin-routing/admin-routing.module';
import {AdminDashboard1Component} from './admin-dashboard1/admin-dashboard1.component';
import {AdminControlSidebarComponent} from './admin-control-sidebar/admin-control-sidebar.component';
import {AdminFooterComponent} from './admin-footer/admin-footer.component';
import {AdminContentComponent} from './admin-content/admin-content.component';
import {AdminLeftSideComponent} from './admin-left-side/admin-left-side.component';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AdminComponent} from './admin.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminDashboard2Component} from './admin-dashboard2/admin-dashboard2.component';

import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading';
import {AdminClassesComponent} from './admin-classes/admin-classes.component';

import {LoggedInGuard} from '../login/logged-in-guard';
import {AuthService} from '../login/auth-service';
import {AdminAddClassComponent} from './admin-classes/admin-add-class/admin-add-class.component';

import {ModalModule} from 'ngx-modialog';
import {BootstrapModalModule} from 'ngx-modialog/plugins/bootstrap';
import {FileUploadModule} from 'ng2-file-upload'; // 文件上传组件
import {HttpInterceptorService} from '../util/http-interceptor-service.service'; // 自定义httpService
import {NgxPaginationModule} from 'ngx-pagination'; // 分页组件 <-- import the module

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBorderRadius: '4px',
      backdropBackgroundColour: 'rgba(255,255,255,0.2)',
      primaryColour: '#74f3ff',
      secondaryColour: '#74f3ff',
      tertiaryColour: '#74f3ff',
      fullScreenBackdrop: false,
    }),
    ModalModule.forRoot(),
    BootstrapModalModule,
    FileUploadModule,
    NgxPaginationModule,
  ],
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminLeftSideComponent,
    AdminContentComponent,
    AdminFooterComponent,
    AdminControlSidebarComponent,
    AdminDashboard1Component,
    AdminDashboard2Component,
    AdminClassesComponent,
    AdminAddClassComponent,
  ],
  exports: [AdminComponent],
  providers: [AuthService, LoggedInGuard, HttpInterceptorService]
})
export class AdminModule {
}
