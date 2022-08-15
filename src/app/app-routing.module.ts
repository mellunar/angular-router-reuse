import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { Page4Component } from './pages/page4/page4.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Page1Component,
  },
  {
    path: 'about',
    component: Page2Component,
  },
  {
    path: 'test',
    children: [
      { path: '', component: Page3Component, pathMatch: 'full' },
      { path: 'page4', component: Page4Component },
      { path: 'page4/:id', component: Page4Component },
      { path: ':id', component: Page3Component },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
