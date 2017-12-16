import {Injectable} from '@angular/core';
import {BootstrapModalSize, Modal} from 'ngx-modialog/plugins/bootstrap';

@Injectable()
export class DialogService {

  constructor(public modal: Modal) {
  }

  public showConfirmDialog<T>(message: string, callback: (data: T) => void, callbackParam: T): void {
    const dialogRef = this.modal.confirm()
      .size(<BootstrapModalSize>'sm') // lg
      .showClose(true)
      .titleHtml(`<h4><i class="fa fa-exclamation-circle"> 消息提醒</h4></i>`)
      .body(`<h4>${message}</h4>`)
      .okBtn(`确定`)
      .okBtnClass('btn btn-primary btn-flat btn-sm')
      .cancelBtn(`取消`)
      .cancelBtnClass('btn btn-default btn-flat btn-sm')
      .open();

    dialogRef.result
      .then(result => {
          if (result === true && callback != null && callback !== undefined) {
            callback(callbackParam);
          }
        }
      )
      .catch(error => {
        console.log(`showConfirmDialog Error is ${error}`);
      });
  }

  public showDialog<T>(message: string, callback: (data: T) => void, callbackParam: T): void {
    const dialogRef = this.modal.alert()
      .size(<BootstrapModalSize>'sm') // lg
      .showClose(true)
      .titleHtml(`<h4><i class="fa fa-exclamation-circle"> 消息提醒</h4></i>`)
      .body(`<h4>${message}</h4>`)
      .okBtn(`确定`)
      .okBtnClass('btn btn-primary btn-flat btn-sm')
      .open();

    dialogRef.result
      .then(result => {
          if (callback != null && callback !== undefined) {
            callback(callbackParam);
          }
        }
      )
      .catch(error => {
        console.log(`showDialog Error is ${error}`);
      });
  }
}
