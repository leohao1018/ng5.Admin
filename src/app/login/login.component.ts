import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

import {} from 'jquery';
import {} from 'icheck';
import {UserModel} from './user-model';
import {AppSetting} from '../app-setting';
import {AuthService} from './auth-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel = {username: '', password: '', remember: false};
  loading = false;
  loginErrorMsg = '';

  constructor(private loginService: LoginService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.initPage();
  }

  login(): void {
    this.loading = true;
    this.loginService.login(this.user)
      .then(loginToken => {
        if (loginToken && loginToken.access_token) {
          this.authService.login(JSON.stringify(loginToken));
        }
        this.loading = false;
        window.location.href = '/admin/class/classes';
        // this.router.navigateByUrl('/admin/dashboard1');// 这种方式会有样式报错
      })
      .catch(error => {
        this.loading = false;
        this.loginErrorMsg = '登录失败，请检查用户名或者密码！';
      });
  }

  /**
   * 页面初始化
   * */
  private initPage() {
    jQuery('body').addClass('hold-transition login-page');
  }
}
