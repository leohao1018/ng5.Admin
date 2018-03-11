import {Component, Input, OnInit} from '@angular/core';
import {DialogService} from '../../util/dialog-service';
import {Router} from '@angular/router';
import {StatusCode} from '../../dto/status-code';
import {AppSetting} from '../../app-setting';
import {HttpInterceptorService} from '../../util/http-interceptor-service.service';
import {SystemAccountDto} from '../../dto/system-account-dto';

@Component({
  selector: 'app-admin-system-dynamic',
  templateUrl: './admin-system-dynamic.component.html',
  styleUrls: []
})
export class AdminSystemDynamicComponent implements OnInit {

  queryUrl = AppSetting.apiBaseUrl + 'SystemAccount/GetPublishAccount';

  isShowDataLoading = false;
  isCheckedAll = false;

  @Input('data')
  totalCount = 0;
  dataArr: SystemAccountDto[] = [];
  queryParam = {
    PageIndex: 1,
    PageSize: 10,
  };

  initQueryParam(): void {
    this.queryParam = {
      PageIndex: 1,
      PageSize: 10,
    };
  }

  constructor(private httpClient: HttpInterceptorService,
              private router: Router,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.queryList();
    }, 0);
  }

  /**
   * 分页点击
   * @param $event
   */
  pageChange($event: any): void {
    this.queryParam.PageIndex = $event;
    this.queryList();
  }

  /**
   * 加载数据
   */
  queryList(): void {
    this.isShowDataLoading = true;
    this.httpClient.postByHttpClient(this.queryUrl, this.queryParam).subscribe(res => {
      if (res.StatusCode !== StatusCode.SUCCESS) {
        this.dataArr = [];
        return;
      }
      this.totalCount = res.TotalCount;
      this.dataArr = res.Result as SystemAccountDto[];
      let index = 1;
      this.dataArr.map(x => {
        x.Index = index++;
      });

      this.isShowDataLoading = false;
    });
  }

  /**
   * 重置
   */
  resetSearch(): void {
    this.initQueryParam();
    this.queryList();
  }

  /**
   * 全选
   */
  checkAll(): void {
    this.isCheckedAll = !this.isCheckedAll;
    this.dataArr.map(x => {
      x.Checked = this.isCheckedAll;
    });
  }

  /**
   * 单个勾选
   * @param item
   */
  dataItemCheckChange(item: any): void {
    item.Checked = !item.Checked;
  }

  /**
   * 列表数量变更
   */
  pageSizeChange(): void {
    this.queryParam.PageIndex = 1;
    this.queryList();
  }

  // /**
  //  * 跳转到新增
  //  */
  // addNew(): void {
  //   this.router.navigateByUrl('/admin/class/addClass');
  // }

  // /**
  //  * 编辑
  //  */
  // editOne(): void {
  //   const selectDataArr = this.dataArr.filter(x => x.Checked);
  //   if (selectDataArr.length <= 0) {
  //     return;
  //   }
  //   if (selectDataArr.length > 1) {
  //     this.dialogService.showDialog('只能选中一条数据编辑！', null, null);
  //     return;
  //   }
  //   const item = selectDataArr[0];
  //   this.router.navigateByUrl('/admin/class/addClass?id=' + item.Id);
  // }

  // /**
  //  * 删除
  //  */
  // delete(): void {
  //   const selectDataArr = this.dataArr.filter(x => x.Checked);
  //   if (selectDataArr.length <= 0) {
  //     return;
  //   }
  //
  //   this.dialogService.showConfirmDialog('确定要删除选中的数据吗！', arr => {
  //     this.isCheckedAll = false;
  //     arr.map(x => {
  //       const url = this.deleteUrl + '?id=' + x.Id;
  //       this.httpClient.getByHttpClient(url).subscribe(res => {
  //         if (res.StatusCode === StatusCode.SUCCESS) {
  //           this.queryList();
  //         }
  //       });
  //     });
  //   }, selectDataArr);
  // }


  /**
   * 发布动态
   */
  publishDynamic(id: number): void {
    // const selectDataArr = this.dataArr.filter(x => x.Checked);
    // if (selectDataArr.length <= 0) {
    //   return;
    // }
    // if (selectDataArr.length > 1) {
    //   this.dialogService.showDialog('只能选中一条发布动态！', null, null);
    //   return;
    // }
    const item = this.dataArr.filter(x => x.Id === id)[0];
    this.router.navigateByUrl(`/admin/systemDynamic/info?accountId=${item.Id}&accountName=${item.AccountName}`);
  }
}
