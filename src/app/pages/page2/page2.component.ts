import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class Page2Component implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    console.log('page 2');
  }

  ngOnDestroy() {
    console.log('2 destroyed');
  }
}
