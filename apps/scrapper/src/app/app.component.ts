import { Component } from '@angular/core';
import { SideNavItem } from '@bwl-opentools/models/ui/side-nav-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items: SideNavItem[] = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
  ];
}
