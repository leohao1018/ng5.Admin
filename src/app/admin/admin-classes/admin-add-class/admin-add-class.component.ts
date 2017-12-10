import {Component, OnInit} from '@angular/core';
import {SocialClassDto} from '../../../dto/social-class-dto';
import {} from 'jquery';

import {ActivatedRoute, ParamMap, Params} from '@angular/router';

import {Overlay} from 'ngx-modialog';
import {Modal} from 'ngx-modialog/plugins/bootstrap';

import {FileUploader} from 'ng2-file-upload';
import {AppSetting} from '../../../app-setting';
import {HttpInterceptorService} from '../../../util/http-interceptor-service.service';
import {StatusCode} from '../../../dto/status-code';

import {UUID} from 'angular2-uuid';
import {TAttachmentDto} from "../../../dto/tattachment-dto";


@Component({
  selector: 'app-admin-add-class',
  templateUrl: './admin-add-class.component.html',
  styleUrls: ['./admin-add-class.component.css']
})
export class AdminAddClassComponent implements OnInit {
  currentEntity: SocialClassDto = new SocialClassDto();

  loading = false;
  public uploader: FileUploader = new FileUploader({url: AppSetting.fileUploadUrl});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public isUploadShow = false;
  picAttachmentList = [];
  musicAttachmentList = [];
  videoAttachmentList = [];

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(public modal: Modal,
              private route: ActivatedRoute,
              private httpService: HttpInterceptorService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.initEntity(params['id']);
    });
  }

  initEntity(id: number): void {
    if (id) {
      const url = AppSetting.apiBaseUrl + `SocialClass/get/${id}`;
      this.httpService.getByHttpClient(url).subscribe(res => {
        if (res.StatusCode === StatusCode.SUCCESS) {
          this.currentEntity = res.Result as SocialClassDto;

          this.loadPicAttr(this.currentEntity.PicId);
          this.loadMusicAttr(this.currentEntity.MusicId);
          this.loadVideoAttr(this.currentEntity.VideoId);
        }
      });
    } else {
      this.currentEntity.PicId = UUID.UUID();
      this.currentEntity.MusicId = UUID.UUID();
      this.currentEntity.VideoId = UUID.UUID();
    }
  }

  add(): void {
    this.loading = true;
    const urlMethod = this.currentEntity.Id > 0 ? `modify?id=${this.currentEntity.Id}` : 'add';
    const url = AppSetting.apiBaseUrl + `SocialClass/${urlMethod}`;
    const dataParam = JSON.stringify(this.currentEntity);
    this.httpService.postByHttpClient(url, this.currentEntity).subscribe(res => {
      if (res.StatusCode === StatusCode.SUCCESS) {
        this.showDialog(res.StatusDescription);
        this.loading = false;
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

  showDialog(message: string): void {
    const dialogRef = this.modal.alert()
      .size('lg') // lg
      .showClose(true)
      .title('A simple Alert style modal window')
      .body(`<h4>Alert is a classic (title/body/footer) 1 button modal window that does not block.</h4>
            <b>Configuration:</b>
            <ul>
                <li>Non blocking (click anywhere outside to dismiss)</li>
                <li>Size large</li>
                <li>Dismissed with default keyboard key (ESC)</li>
                <li>Close wth button click</li>
                <li>${message}</li>
            </ul>
      `)
      .open();
    dialogRef.result
      .then(result =>
        // alert(`The result is: ${result}`)
        console.log(`The result is: ${result}`)
      );
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
}
