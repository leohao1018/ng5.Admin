import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css']
})
export class AdminContentComponent implements OnInit {

  public loading = false
  constructor() { }

  ngOnInit() {
    this.loading = true;
  }

}
