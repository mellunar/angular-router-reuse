import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit, OnDestroy {
  time;

  constructor() {}

  ngOnInit() {
    console.log('page 1');
    this.time = JSON.stringify(new Date());
  }

  ngOnDestroy() {
    console.log('1 destroyed');
  }
}
