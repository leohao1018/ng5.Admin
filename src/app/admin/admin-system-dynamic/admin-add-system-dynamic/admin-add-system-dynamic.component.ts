import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {ANIMATION_TYPES} from 'ngx-loading';
import {DialogService} from '../../../util/dialog-service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UUID} from 'angular2-uuid';
import {StatusCode} from '../../../dto/status-code';
import {TAttachmentDto} from '../../../dto/tattachment-dto';
import {AppSetting} from '../../../app-setting';
import {HttpInterceptorService} from '../../../util/http-interceptor-service.service';
import {FileUploader} from 'ng2-file-upload';
import {SocialDynamicDto} from '../../../dto/social-dynamic-dto';
import {SystemAccountDto} from '../../../dto/system-account-dto';

@Component({
  selector: 'app-admin-add-system-dynamic',
  templateUrl: './admin-add-system-dynamic.component.html',
  styleUrls: []
})
export class AdminAddSystemDynamicComponent implements OnInit {

  accountList = [];
  currentAccount = {Id: undefined, AccountName: undefined};
  currentEntity;
  picAttachmentList = [];
  musicAttachmentList = [];
  videoAttachmentList = [];

  isShowDataLoading = false;
  isShowDataLoadingForList = false;
  dataLoadingConfig = {
    animationType: ANIMATION_TYPES.threeBounce,
    backdropBorderRadius: '4px',
    backdropBackgroundColour: 'rgba(255,255,255,0.2)',
    primaryColour: '#3c8dbc',
    secondaryColour: '#3c8dbc',
    tertiaryColour: '#3c8dbc',
    fullScreenBackdrop: false,
  };
  isShowLoading = false;

  @Input('data')
  totalCount = 0;
  dataArr: SocialDynamicDto[] = [];
  queryParam = {
    PageIndex: 1,
    PageSize: 10,
    AccountId: undefined,
  };
  isCheckedAll = false;

  public uploader: FileUploader = new FileUploader({url: AppSetting.fileUploadUrl});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public isUploadShow = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private dialogService: DialogService,
              private route: ActivatedRoute,
              private httpService: HttpInterceptorService,
              private router: Router,
              private renderer: Renderer2) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentAccount = {Id: params['accountId'], AccountName: params['accountName']};
      this.resetPageData();

      this.queryCurrentDynamics();
      this.loadPublishAccount();
    });
  }

  /**
   * 根据Id加载数据
   * @param {number} id
   */
  loadEntity(id: number): void {
    if (id) {
      this.isShowDataLoading = true;
      setTimeout((args) => {
        const url = AppSetting.apiBaseUrl + `SocialDynamic/get/${id}`;
        this.httpService.getByHttpClient(url).subscribe(res => {
          if (res.StatusCode === StatusCode.SUCCESS) {
            this.currentEntity = res.Result as SocialDynamicDto;

            this.setCurrentAccount(this.currentEntity.AccountId);

            this.loadPicAttr(this.currentEntity.PicId);
            this.loadMusicAttr(this.currentEntity.MusicId);
            this.loadVideoAttr(this.currentEntity.VideoId);
          }
          this.isShowDataLoading = false;
        });
      }, 0);
    }
  }

  /**
   * 数据保存
   */
  save(): void {
    this.isShowLoading = true;
    this.currentEntity.AccountId = this.currentAccount.Id;
    const urlMethod = this.currentEntity.Id > 0 ? `modify?id=${this.currentEntity.Id}` : 'add';
    const url = AppSetting.apiBaseUrl + `SocialDynamic/${urlMethod}`;
    this.httpService.postByHttpClient(url, this.currentEntity).subscribe(res => {
      if (res.StatusCode === StatusCode.SUCCESS) {
        this.dialogService.showDialog(res.StatusDescription,
          param => {
            this.resetPageData();
            this.queryCurrentDynamics();
          },
          null);
        this.isShowLoading = false;
      }
    });
  }

  /**
   * 页面数据重置
   */
  resetPageData(): void {
    this.currentEntity = new SocialDynamicDto();

    this.currentEntity.PicId = UUID.UUID();
    this.currentEntity.MusicId = UUID.UUID();
    this.currentEntity.VideoId = UUID.UUID();

    this.picAttachmentList = [];
    this.musicAttachmentList = [];
    this.videoAttachmentList = [];
  }

  // 附件操作 begin ================================
  uploadAttr(uuid: string): void {
    this.uploader = new FileUploader({
      url: AppSetting.fileUploadUrl + '?uuid=' + uuid,
      authToken: this.httpService.getAuthToken()
    });
    this.isUploadShow = true;

    this.uploader.onCompleteAll = () => {
      this.loadPicAttr(this.currentEntity.PicId);
      this.loadMusicAttr(this.currentEntity.MusicId);
      this.loadVideoAttr(this.currentEntity.VideoId);
    };
  }

  closeUpload(): void {
    this.isUploadShow = false;
    this.uploader = new FileUploader({url: AppSetting.fileUploadUrl});
  }

  private loadPicAttr(PicId: string) {
    if (PicId) {
      const url = AppSetting.apiBaseUrl + 'TAttachment/getByParentId?parentGuid=' + PicId;
      this.httpService.getByHttpClient(url).subscribe(res => {
        if (res.StatusCode === StatusCode.SUCCESS) {
          this.picAttachmentList = res.Result as TAttachmentDto[];
        }
      });
    }
  }

  private loadMusicAttr(MusicId: string) {
    if (MusicId) {
      const url = AppSetting.apiBaseUrl + 'TAttachment/getByParentId?parentGuid=' + MusicId;
      this.httpService.getByHttpClient(url).subscribe(res => {
        if (res.StatusCode === StatusCode.SUCCESS) {
          this.musicAttachmentList = res.Result as TAttachmentDto[];
        }
      });
    }
  }

  private loadVideoAttr(VideoId: string) {
    if (VideoId) {
      const url = AppSetting.apiBaseUrl + 'TAttachment/getByParentId?parentGuid=' + VideoId;
      this.httpService.getByHttpClient(url).subscribe(res => {
        if (res.StatusCode === StatusCode.SUCCESS) {
          this.videoAttachmentList = res.Result as TAttachmentDto[];
        }
      });
    }
  }

  viewAttachment(attr: TAttachmentDto): void {
    if (attr && attr.Id) {
      const url = AppSetting.apiBaseUrl + 'TAttachment/Download?id=' + attr.Id;
      window.open(url);
    }
  }

  deleteAttachment(attr: TAttachmentDto): void {
    if (attr && attr.Id) {
      const url = AppSetting.apiBaseUrl + 'TAttachment/deleteLogic?id=' + attr.Id;
      this.httpService.getByHttpClient(url).subscribe(res => {
        if (res.StatusCode === StatusCode.SUCCESS) {
          this.loadPicAttr(this.currentEntity.PicId);
          this.loadMusicAttr(this.currentEntity.MusicId);
          this.loadVideoAttr(this.currentEntity.VideoId);
        }
      });
    }
  }

  // 附件操作 end  ================================

  /**
   * 返回列表页
   */
  goListPage(): void {
    this.router.navigateByUrl('/admin/systemDynamic/list');
  }

  /**
   * 加载已发布的动态列表
   */
  private queryCurrentDynamics() {
    this.isShowDataLoadingForList = true;
    this.queryParam.AccountId = this.currentAccount.Id;
    const url = AppSetting.apiBaseUrl + `SocialDynamic/GetLatest`;
    this.httpService.postByHttpClient(url, this.queryParam).subscribe(res => {
      if (res.StatusCode === StatusCode.SUCCESS) {
        this.dataArr = res.Result as SocialDynamicDto[];
        this.dataArr.forEach((x, index) => {
          x.Index = index + 1;
        });
      }
      this.isShowDataLoadingForList = false;
    });
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
    // console.log(1)
    item.Checked = !item.Checked;
  }

  /**
   * 列表数量变更
   */
  pageSizeChange(): void {
    this.queryParam.PageIndex = 1;
    this.queryCurrentDynamics();
  }

  /**
   * 编辑一条数据
   */
  editOne(): void {
    const selectDataArr = this.dataArr.filter(x => x.Checked);
    if (selectDataArr.length <= 0) {
      this.dialogService.showDialog('请勾选数据！', null, null);
      return;
    }
    if (selectDataArr.length > 1) {
      this.dialogService.showDialog('只能选中一条数据编辑！', null, null);
      return;
    }
    const selectItem = selectDataArr[0];
    this.loadEntity(selectItem.Id);
    // 文本框焦点
    this.renderer.selectRootElement('#txtSubject').scrollIntoView();
  }

  /**
   * 新增
   */
  addNew(): void {
    this.resetPageData();
    // 文本框焦点
    this.renderer.selectRootElement('#txtSubject').scrollIntoView();
  }

  /**
   * 删除动态
   */
  delete(): void {
    this.resetPageData();
    const selectDataArr = this.dataArr.filter(x => x.Checked);
    if (selectDataArr.length <= 0) {
      return;
    }
    this.resetPageData();
    this.dialogService.showConfirmDialog('确定要删除选中的数据吗！', arr => {
      this.isCheckedAll = false;
      arr.map(x => {
        const url = AppSetting.apiBaseUrl + 'SocialDynamic/deleteLogic?id=' + x.Id;
        this.httpService.getByHttpClient(url).subscribe(res => {
          if (res.StatusCode === StatusCode.SUCCESS) {
            this.queryCurrentDynamics();
          }
        });
      });
    }, selectDataArr);
  }

  /**
   * 加载发不动态的系统账号
   */
  private loadPublishAccount() {
    this.queryPublishAccount();
  }

  /**
   * 加载数据
   */
  queryPublishAccount(): void {
    this.isShowDataLoading = true;
    const queryUrl = AppSetting.apiBaseUrl + 'SystemAccount/GetPublishAccount';
    const postParam = {
      PageSize: 100,
      PageIndex: 1,
    };
    this.httpService.postByHttpClient(queryUrl, postParam).subscribe(res => {
      if (res.StatusCode !== StatusCode.SUCCESS) {
        return;
      }
      (res.Result as SystemAccountDto[]).forEach(x => {
        this.accountList.push({Id: x.Id, AccountName: x.AccountName});
      });
      this.isShowDataLoading = false;
    });
  }

  changeAccount($event: string): void {
    this.setCurrentAccount(parseInt($event));
    this.queryCurrentDynamics();
  }

  private setCurrentAccount(AccountId: number) {
    const selected = this.accountList.find(x => x.Id === AccountId);
    this.currentAccount = {Id: selected.Id, AccountName: selected.AccountName};
  }
}
