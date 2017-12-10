import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.css']
})


export class AdminClassesComponent implements OnInit {
  @Input('data')
  meals: string[] = ['1', '2', '3'];
  page = 3;
  totalPage = 100;

  constructor() {
  }

  ngOnInit() {
  }

  pageChange($event: any): void {
    this.page = $event;
    this.meals  = ['4', '5', '6'];
  }
}
