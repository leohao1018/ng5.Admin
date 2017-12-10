import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {LoginTokenModel} from './login-token-model';
import {UserModel} from './user-model';

import 'rxjs/add/operator/toPromise';
import {Subscription} from 'rxjs/Subscription';
import {AppSetting} from '../app-setting';

@Injectable()
export class LoginService {

  constructor(private _http: Http) {
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  /**
   * 获取授权token
   * */
  login(user: UserModel): Promise<any> {
    const regUrl = AppSetting.apiBaseUrl + 'getAccessToken';
    const reqData = `grant_type=password&username=${user.username}&password=${user.password}`;

    return this._http.post(regUrl, (reqData))
      .toPromise()
      .then(response => {
        return response.json() as LoginTokenModel;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
