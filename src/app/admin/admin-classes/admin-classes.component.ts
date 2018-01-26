import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {SocialClassDto} from '../../dto/social-class-dto';
import {AppSetting} from '../../app-setting';
import {HttpInterceptorService} from '../../util/http-interceptor-service.service';
import {StatusCode} from '../../dto/status-code';
import {} from 'jquery';
import {Router} from '@angular/router';
import {DialogService} from '../../util/dialog-service';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.css']
})

export class AdminClassesComponent implements OnInit {
  queryUrl = AppSetting.apiBaseUrl + 'SocialClass/pagingData';
  deleteUrl = AppSetting.apiBaseUrl + 'SocialClass/deleteLogic';

  isShowDataLoading = false;
  isShowLoading = false;
  isCheckedAll = false;

  @Input('data')
  totalCount = 0;
  dataArr: SocialClassDto[] = [];
  queryParam = {
    PageIndex: 1,
    PageSize: 10,
    Type: undefined,
    Subject: undefined
  };

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
      this.dataArr = res.Result as SocialClassDto[];
      let index = 1;
      this.dataArr.map(x => {
        x.Index = index++;
        switch (x.Type) {
          case 1 : {
            x.TypeString = '诵经';
            break;
          }
          case 2 : {
            x.TypeString = '打坐';
            break;
          }
          case 3 : {
            x.TypeString = '持咒';
            break;
          }
          case 4 : {
            x.TypeString = '抄经';
            break;
          }
          case 5 : {
            x.TypeString = '念佛';
            break;
          }
          default: {
            break;
          }
        }
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

  /**
   * 跳转到新增
   */
  addNew(): void {
    this.router.navigateByUrl('/admin/class/addClass');
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
    this.router.navigateByUrl('/admin/class/addClass?id=' + item.Id);
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

}



