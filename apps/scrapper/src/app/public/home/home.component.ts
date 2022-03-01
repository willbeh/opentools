import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Scrapper } from '@bwl-opentools/models/scrapper/scrapper';
import { finalize } from 'rxjs';
import { resultOppo } from '../../../samples/result-oppo';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  form = new FormGroup({
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
      ),
    ]),
  });

  loading = false;
  result: Scrapper = resultOppo;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.loading = true;
    this.http
      .post<Scrapper>('/api/scrapper', this.form.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((result) => (this.result = result));
  }
}
