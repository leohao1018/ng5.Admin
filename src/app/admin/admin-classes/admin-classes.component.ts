import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {SocialClassDto} from '../../dto/social-class-dto';
import {AppSetting} from '../../app-setting';
import {HttpInterceptorService} from '../../util/http-interceptor-service.service';
import {StatusCode} from '../../dto/status-code';
import {} from 'jquery';
import {ANIMATION_TYPES} from 'ngx-loading';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.css']
})

export class AdminClassesComponent implements OnInit {
  queryUrl = AppSetting.apiBaseUrl + 'SocialClass/PagingData';
  addUrl = 'SocialClass/PagingData';
  editUrl = 'SocialClass/PagingData';
  deleteUrl = AppSetting.apiBaseUrl + 'SocialClass/PagingData';

  showDataLoading = false;
  dataLoadingConfig = {
    animationType: ANIMATION_TYPES.threeBounce,
    backdropBorderRadius: '4px',
    backdropBackgroundColour: 'rgba(255,255,255,0.2)',
    primaryColour: '#3c8dbc',
    secondaryColour: '#3c8dbc',
    tertiaryColour: '#3c8dbc',
    fullScreenBackdrop: false,
  };
  showLoading = false;
  checkedAllData = false;

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
              private router: Router) {
  }

  ngOnInit() {
    this.queryList();
  }

  pageChange($event: any): void {
    this.queryParam.PageIndex = $event;
    this.queryList();
  }

  queryList(): void {
    this.showLoading = true;
    this.showDataLoading = true;
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
          case 0 : {
            x.TypeString = '诵经';
            break;
          }
          case 1 : {
            x.TypeString = '打坐';
            break;
          }
          case 2 : {
            x.TypeString = '持咒';
            break;
          }
          case 3 : {
            x.TypeString = '抄经';
            break;
          }
          default: {
            break;
          }
        }
      });

      this.showLoading = false;
      this.showDataLoading = false;
    });
  }

  resetSearch(): void {
    this.initQueryParam();
    this.queryList();
  }

  checkAll(): void {
    this.checkedAllData = !this.checkedAllData;
    this.dataArr.map(x => {
      x.Checked = this.checkedAllData;
    });
  }

  dataCheckChange(item: any): void {
    item.Checked = !item.Checked;
  }

  addNew(): void {
    this.router.navigateByUrl('/admin/addClass');
  }

  editOne(): void {
    this.dataArr.map(x => {
      if (x.Checked) {
        this.router.navigateByUrl('/admin/addClass?id=' + x.Id);
      }
    });
  }

  delete(): void {

  }

}
