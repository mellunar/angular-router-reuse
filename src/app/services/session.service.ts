import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  previousRoute: string;
  currentRoute: string;

  constructor() {}

  updateRoutes(previous: string, current: string) {
    this.previousRoute = previous;
    this.currentRoute = current;
  }
}
