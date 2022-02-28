import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./public/home/home.module').then((m) => m.HomeModule),
  },
];
