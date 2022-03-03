import { Component, Input } from '@angular/core';
import {
  Scrapper,
  ScrapperDetail,
} from '@bwl-opentools/models/scrapper/scrapper';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Input() result: Scrapper;

  displayItems = ['h1', 'h2', 'h3', 'p'];

  getItem(key: string) {
    return this.result[key] as ScrapperDetail[];
  }
}
