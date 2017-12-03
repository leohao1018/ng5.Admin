import {Component, OnInit} from '@angular/core';
import {SocialClassDto} from '../../../dto/social-class-dto';
import {} from 'jquery';

import {Overlay} from 'ngx-modialog';
import {Modal} from 'ngx-modialog/plugins/bootstrap';

import {FileUploader} from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-admin-add-class',
  templateUrl: './admin-add-class.component.html',
  styleUrls: ['./admin-add-class.component.css']
})
export class AdminAddClassComponent implements OnInit {
  currentEntity: SocialClassDto = new SocialClassDto();
  loading = false;

  constructor(public modal: Modal) {
  }

  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {
  }

  add(): void {
    this.loading = true;
  }

  uploadAttr(): void {
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
                <li>HTML content</li>
            </ul>
      `)
      .open();
    dialogRef.result
      .then(result => alert(`The result is: ${result}`));
  }

}
