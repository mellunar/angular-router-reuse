import { ComponentRef } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  // references
  // https://stackoverflow.com/a/41515648/16843428
  // https://javascript.plainenglish.io/angular-route-reuse-strategy-b5d40adce841
  // https://github.com/angular/angular/issues/16713

  private storedRoutes: { [key: string]: DetachedRouteHandle }[] = [];

  // shouldDetach and store are called when leaving a route
  // if returns true, allows store method to save current component
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  // handles logic for storing
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle) {
    // path is the route you just left
    // it's safer to store component name due to root routes
    // being considered null as they are === ''
    const path = route.routeConfig.component.name;
    const hasRoute = this.storedRoutes.some((i) => i[path]);
    if (handle && !hasRoute) {
      this.storedRoutes.push({ [path]: handle });
    }
  }

  // should attach and retrieve are called when entering a route
  // if returns true allows retrieve to use component from store
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    let path, isPathStored, remove;

    // children routes are loaded before page routes, which breaks app
    if (route.children && !route.routeConfig?.component) {
      return false;
    }

    path = route.routeConfig.component.name;

    if (this.storedRoutes.length > 1) {
      isPathStored = Object.keys(this.storedRoutes[0])[0] === path;
    }

    if (isPathStored) {
      remove = this.storedRoutes.pop();
    } else if (this.storedRoutes.length > 1) {
      remove = this.storedRoutes.shift();
    }

    if (remove) {
      this.deactivateOutlet(remove[Object.keys(remove)[0]]);
    }

    const hasRoute = this.storedRoutes.some((i) => i[path]);
    return !!route.routeConfig && hasRoute;
  }

  // get component from store
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const path = route.routeConfig.component.name;
    const index = this.storedRoutes.findIndex((i) => i[path]);
    if (index > -1) {
      return this.storedRoutes[index][path];
    }

    return null;
  }

  // lets you decide if you want to allow Angular to reuse the same component object
  // when navigating between routes referencing the same component class
  // or if Angular should destroy and rebuild the component every time
  shouldReuseRoute(
    future: ActivatedRouteSnapshot, // route left
    curr: ActivatedRouteSnapshot // next route
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  // manual component destroy is needed for this strategy
  private deactivateOutlet(handle) {
    const componentRef: ComponentRef<any> = handle.componentRef;
    if (componentRef) {
      componentRef.destroy();
    }
  }
}

/*
      const item = this.storedRoutes.splice(index, 1);
      this.storedRoutes.push(item[0]);
      return item[0][path];
*/

/*
    if (route.routeConfig.children) {
      const url = window.location.href;
      const words = url.match(/(?<=\/)(?:\w+)/gm);
      const params = [];

      route.routeConfig.children.forEach((child) => {
        words.reverse().forEach((word) => {
          if (word === child.path) {
            path = child.component.name;
          } else if (child.path.includes(':')) {
            params.push(child.path);
          }
        });
      });
    } else {
      path = route.routeConfig.component.name;
    }
    */
