import { Component } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private sessionService: SessionService) {
    this.appInit();
  }

  appInit() {
    this.routerRegister();
  }

  routerRegister() {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        this.sessionService.updateRoutes(
          events[0].urlAfterRedirects,
          events[1].urlAfterRedirects
        );
      });
  }
}
