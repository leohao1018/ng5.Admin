import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {SocialComplainDto} from '../../dto/social-complain-dto';
import {AppSetting} from '../../app-setting';
import {HttpInterceptorService} from '../../util/http-interceptor-service.service';
import {StatusCode} from '../../dto/status-code';
import {} from 'jquery';
import {Router} from '@angular/router';
import {DialogService} from '../../util/dialog-service';
import {BootstrapModalSize, Modal} from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-complain.component.html',
  styleUrls: []
})
export class AdminComplainComponent implements OnInit {
  queryUrl = AppSetting.apiBaseUrl + 'SocialComplain/pagingData';
  deleteUrl = AppSetting.apiBaseUrl + 'SocialComplain/deleteLogic';

  isShowDataLoading = false;
  isShowLoading = false;
  isCheckedAll = false;

  @Input('data')
  totalCount = 0;
  dataArr: SocialComplainDto[] = [];
  queryParam = {
    PageIndex: 1,
    PageSize: 10,
    Type: undefined,
    Subject: undefined
  };

  viewComplain: SocialComplainDto;
  viewDynamicSubject: string;
  viewDynamicPics: string[];
  viewDynamicMusics: string[];
  viewDynamicVideos: string[];


  initQueryParam(): void {
    this.queryParam = {
      PageIndex: 1,
      PageSize: 10,
      Type: undefined,
      Subject: undefined
    };
  }

  constructor(private httpClient: HttpInterceptorService,
              private router: Router,
              private dialogService: DialogService,
              private modal: Modal) {
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
    this.isShowLoading = true;
    this.isShowDataLoading = true;
    this.httpClient.postByHttpClient(this.queryUrl, this.queryParam).subscribe(res => {
      if (res.StatusCode !== StatusCode.SUCCESS) {
        this.dataArr = [];
        return;
      }
      this.totalCount = res.TotalCount;
      this.dataArr = res.Result as SocialComplainDto[];
      let index = 1;
      this.dataArr.map(x => {
        x.Index = index++;

        x.IsDynamicDelete = x.Dynamic.LogicallyDelete;
        x.IsDynamicDeleteStr = x.IsDynamicDelete ? '已删除' : '未删除';
      });

      this.isShowLoading = false;
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
  dataItemCheckChange($event, item: any): void {
    $event.stopPropagation();
    item.Checked = !item.Checked;
  }

  /**
   * 列表数量变更
   */
  pageSizeChange(): void {
    this.queryParam.PageIndex = 1;
    this.queryList();
  }


  /**
   * 删除
   */
  delete(): void {
    const selectDataArr = this.dataArr.filter(x => x.Checked);
    if (selectDataArr.length <= 0) {
      return;
    }

    this.dialogService.showConfirmDialog('确定要删除选中的数据吗！', arr => {
      this.isCheckedAll = false;
      arr.map(x => {
        const url = this.deleteUrl + '?id=' + x.Id;
        this.httpClient.getByHttpClient(url).subscribe(res => {
          if (res.StatusCode === StatusCode.SUCCESS) {
            this.queryList();
          }
        });
      });
    }, selectDataArr);
  }

  /**
   * 查看详细
   * @param $event
   * @param item
   */
  viewDynamicDetail($event, item): void {
    $event.stopPropagation();
    this.viewComplain = item;

    this.viewDynamicSubject = item.Dynamic.Subject;
    this.viewDynamicPics = item.Dynamic.Pics;
    //
    // this.viewDynamicMusics = item.Dynamic.Musics;
    // this.viewDynamicVideos = item.Dynamic.Videos;

    document.getElementById('openModalButton').click();
  }

  /**
   * 删除举报的动态
   */
  deleteDynamic(): void {

    this.dialogService.showConfirmDialog('确定要删除选中的数据吗！', arr => {
      const url = AppSetting.apiBaseUrl + 'SocialDynamic/deleteLogic?id=' + this.viewComplain.Dynamic.Id;
      this.httpClient.getByHttpClient(url).subscribe(res => {
        if (res.StatusCode === StatusCode.SUCCESS) {
          this.queryList();
        }
      });
    }, null);
  }

}




