import { Component, Input } from '@angular/core';
import { Scrapper } from '@bwl-opentools/models/scrapper/scrapper';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Input() result: Scrapper;
}
