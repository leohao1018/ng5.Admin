// 创建登录认证服务
import {Injectable} from '@angular/core';
import {AppSetting} from '../app-setting';

@Injectable()
export class AuthService {
  login(userTokenString: string): boolean {
    // 成功登录后，将 username 保存到 `localStorage`
    // localStorage 是 HTML5 提供的键/值对，它能用来
    // 将持久数据保存到浏览器中。
    // API：https://developer.mozilla.org/en-US/docs/Web/API/Storage
    localStorage.setItem(AppSetting.currentTokenKey, userTokenString);
    return true;
  }

  logout(): any {
    localStorage.removeItem(AppSetting.currentTokenKey);
  }

  getUser(): any {
    return localStorage.getItem(AppSetting.currentTokenKey);
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}

export let AUTH_PROVIDERS: Array<any> = [
  {provide: AuthService, useClass: AuthService}
];
