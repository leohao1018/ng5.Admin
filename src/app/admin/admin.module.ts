import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing/admin-routing.module';
import {AdminDashboard1Component} from './admin-dashboard1/admin-dashboard1.component';
import {AdminControlSidebarComponent} from './admin-control-sidebar/admin-control-sidebar.component';
import {AdminFooterComponent} from './admin-footer/admin-footer.component';
import {AdminContentComponent} from './admin-content/admin-content.component';
import {AdminLeftSideComponent} from './admin-left-side/admin-left-side.component';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AdminComponent} from './admin.component';
import {AdminDashboard2Component} from './admin-dashboard2/admin-dashboard2.component';

import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading'; // loading框

import {AdminClassesComponent} from './admin-classes/admin-classes.component';
import {AdminAddClassComponent} from './admin-classes/admin-add-class/admin-add-class.component';

import {LoggedInGuard} from '../login/logged-in-guard'; // 登录拦截
import {AuthService} from '../login/auth-service';      // 登录判断

import {FileUploadModule} from 'ng2-file-upload';                                 // 文件上传组件
import {HttpInterceptorService} from '../util/http-interceptor-service.service';  // 自定义httpService
import {NgxPaginationModule} from 'ngx-pagination';                               // 分页组件 <-- import the module

import {BootstrapModalModule} from 'ngx-modialog/plugins/bootstrap';  // 弹窗模块
import {ModalModule} from 'ngx-modialog';                             // 弹窗;
import { AdminSystemDynamicComponent } from './admin-system-dynamic/admin-system-dynamic.component';
import {DialogService} from '../util/dialog-service'; // 弹窗模块封装
import {AdminAddSystemDynamicComponent} from './admin-system-dynamic/admin-add-system-dynamic/admin-add-system-dynamic.component';
import {AdminComplainComponent} from './admin-complain/admin-complain.component';
import {AdminDynamicComponent} from './admin-dynamic/admin-dynamic.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBorderRadius: '4px',
      backdropBackgroundColour: 'rgba(255,255,255,0.2)',
      primaryColour: '#3c8dbc',
      secondaryColour: '#3c8dbc',
      tertiaryColour: '#3c8dbc',
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
    AdminSystemDynamicComponent,
    AdminAddSystemDynamicComponent,
    AdminDynamicComponent,
    AdminComplainComponent,
    AdminClassesComponent,
    AdminAddClassComponent,
  ],
  exports: [AdminComponent],
  providers: [AuthService, LoggedInGuard, HttpInterceptorService, DialogService]
})
export class AdminModule {
}
