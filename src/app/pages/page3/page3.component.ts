import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss'],
})
export class Page3Component implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    console.log('page 3');
  }

  ngOnDestroy() {
    console.log('3 destroyed');
  }
}
