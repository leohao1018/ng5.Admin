import {Component, Input, OnInit, ChangeDetectionStrategy, Renderer2} from '@angular/core';
import {SocialComplainDto} from '../../dto/social-complain-dto';
import {AppSetting} from '../../app-setting';
import {HttpInterceptorService} from '../../util/http-interceptor-service.service';
import {StatusCode} from '../../dto/status-code';
import {} from 'jquery';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DialogService} from '../../util/dialog-service';
import {BootstrapModalSize, Modal} from 'ngx-modialog/plugins/bootstrap';
import {ANIMATION_TYPES} from 'ngx-loading';
import {SocialDynamicDto} from '../../dto/social-dynamic-dto';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-dynamic.component.html',
  styleUrls: []
})
export class AdminDynamicComponent implements OnInit {
  queryUrl = AppSetting.apiBaseUrl + 'SocialDynamic/GetPagingAll';
  deleteUrl = AppSetting.apiBaseUrl + 'SocialDynamic/deleteLogic';

  isShowDataLoading = false;
  isShowLoading = false;
  isCheckedAll = false;

  @Input('data')
  totalCount = 0;
  dataArr: SocialDynamicDto[] = [];
  queryParam = {
    PageIndex: 1,
    PageSize: 10,
    Subject: undefined,
    LogicallyDelete: undefined,
  };
  viewDynamic: SocialDynamicDto;
  viewDynamicSubject: string;
  viewDynamicPics: string;

  initQueryParam(): void {
    this.queryParam = {
      PageIndex: 1,
      PageSize: 10,
      Subject: undefined,
      LogicallyDelete: undefined,
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
    this.isShowLoading = true;
    this.isShowDataLoading = true;
    this.httpClient.postByHttpClient(this.queryUrl, this.queryParam).subscribe(res => {
      if (res.StatusCode !== StatusCode.SUCCESS) {
        this.dataArr = [];
        return;
      }
      this.totalCount = res.TotalCount;
      this.dataArr = res.Result as SocialDynamicDto[];
      let index = 1;
      this.dataArr.map(x => {
        x.Index = index++;
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
   * 跳转到新增
   */
  addNew(): void {
    this.router.navigateByUrl('/admin/class/info');
  }

  /**
   * 编辑
   */
  editOne(): void {
    const selectDataArr = this.dataArr.filter(x => x.Checked);
    if (selectDataArr.length <= 0) {
      return;
    }
    if (selectDataArr.length > 1) {
      this.dialogService.showDialog('只能选中一条数据编辑！', null, null);
      return;
    }
    const item = selectDataArr[0];
    this.router.navigateByUrl('/admin/class/info?id=' + item.Id);
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
    this.viewDynamic = item;

    this.viewDynamicSubject = item.Subject;
    this.viewDynamicPics = item.Pics;
    //
    // this.viewDynamicMusics = item.Dynamic.Musics;
    // this.viewDynamicVideos = item.Dynamic.Videos;

    document.getElementById('openModalButton').click();
  }

}




