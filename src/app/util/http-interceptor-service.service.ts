import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../login/auth-service';
import {LoginTokenModel} from '../login/login-token-model';
import {BaseResDto} from '../dto/base-res-dto';
import {StatusCode} from '../dto/status-code';


// const httpGetOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };

@Injectable()
export class HttpInterceptorService {

  httpGetOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthToken()
    })
  };

  // httpPOSTOptions = {
  //   headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'POST',
  //     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  //
  //     'Content-Type': 'application/json',
  //     'Authorization': this.getAuthToken()
  //   })
  // };

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  getByHttpClient(url: string): Observable<BaseResDto> {
    return this.httpClient.get<BaseResDto>(url, this.httpGetOptions)
      .pipe(
        tap(_ => console.log(`getByHttpClient fetched url ${url}`))
        , catchError(this.handleHttpClientError<BaseResDto>(`getByHttpClient`))
      );
  }

  postByHttpClient(url: string, postData: any): Observable<BaseResDto> {
    return this.httpClient.post<BaseResDto>(url, postData, this.httpGetOptions)
      .pipe(
        tap((any: BaseResDto) => console.log(`postByHttpClient fetched url ${url}`))
        , catchError(this.handleHttpClientError<BaseResDto>('postByHttpClient'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleHttpClientError<T>(operation = 'operation', result?: BaseResDto) {
    return (error: any): Observable<BaseResDto> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      if (error.status === 401) {
        console.log('登录失败了，请重新登录');
        window.location.href = '/login';
      }

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      const r = new BaseResDto();
      r.StatusCode = StatusCode.ERROR;
      r.StatusDescription = `http请求数据处理失败！message:${error.message}`;
      // return of(result as T);
      return of(r);
    };
  }

  public getAuthToken(): string {
    const userStr = this.authService.getUser();
    const jsonObj = JSON.parse(userStr);
    const type = jsonObj['token_type'];
    const token = jsonObj['access_token'];
    return `${type} ${token}`;
  }
}
