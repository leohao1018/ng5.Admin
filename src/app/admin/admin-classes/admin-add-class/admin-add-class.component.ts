import {Component, OnInit} from '@angular/core';
import {SocialClassDto} from '../../../dto/social-class-dto';
import {} from 'jquery';

import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';

import {Overlay} from 'ngx-modialog';
import {BootstrapModalSize, Modal} from 'ngx-modialog/plugins/bootstrap';

import {FileUploader} from 'ng2-file-upload';
import {AppSetting} from '../../../app-setting';
import {HttpInterceptorService} from '../../../util/http-interceptor-service.service';
import {StatusCode} from '../../../dto/status-code';

import {UUID} from 'angular2-uuid';
import {TAttachmentDto} from '../../../dto/tattachment-dto';
import {ANIMATION_TYPES} from 'ngx-loading';
import {DialogService} from '../../../util/dialog-service';


@Component({
  selector: 'app-admin-add-class',
  templateUrl: './admin-add-class.component.html',
  styleUrls: ['./admin-add-class.component.css']
})
export class AdminAddClassComponent implements OnInit {
  currentEntity: SocialClassDto = new SocialClassDto();
  picAttachmentList = [];
  musicAttachmentList = [];
  videoAttachmentList = [];

  isShowDataLoading = false;
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
              private router: Router) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.initEntity(params['id']);
    });
  }

  initEntity(id: number): void {
    if (id) {
      this.isShowDataLoading = true;
      setTimeout((args) => {
        const url = AppSetting.apiBaseUrl + `SocialClass/get/${id}`;
        this.httpService.getByHttpClient(url).subscribe(res => {
          if (res.StatusCode === StatusCode.SUCCESS) {
            this.currentEntity = res.Result as SocialClassDto;

            this.loadPicAttr(this.currentEntity.PicId);
            this.loadMusicAttr(this.currentEntity.MusicId);
            this.loadVideoAttr(this.currentEntity.VideoId);
          }
          this.isShowDataLoading = false;
        });
      }, 0);
    } else {
      this.currentEntity.PicId = UUID.UUID();
      this.currentEntity.MusicId = UUID.UUID();
      this.currentEntity.VideoId = UUID.UUID();
    }
  }

  save(): void {
    this.isShowLoading = true;
    const urlMethod = this.currentEntity.Id > 0 ? `modify?id=${this.currentEntity.Id}` : 'add';
    const url = AppSetting.apiBaseUrl + `SocialClass/${urlMethod}`;
    this.httpService.postByHttpClient(url, this.currentEntity).subscribe(res => {
      if (res.StatusCode === StatusCode.SUCCESS) {
        this.dialogService.showDialog(res.StatusDescription,
          param => {
            this.router.navigateByUrl('admin/class/classes');
          },
          null);
        this.isShowLoading = false;
      }
    });
  }

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

  goListPage(): void {
    this.router.navigateByUrl('/admin/class/classes');
  }

}
