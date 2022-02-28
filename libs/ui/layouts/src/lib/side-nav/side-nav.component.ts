import { Component, Input } from '@angular/core';
import { SideNavItem } from '@bwl-opentools/models/ui/side-nav-item';

@Component({
  selector: 'ui-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @Input() items: SideNavItem[];
}
