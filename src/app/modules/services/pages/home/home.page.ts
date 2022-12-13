import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSolicitud } from '@store/actions';
import { AppState } from '@store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  toogle = 'in_process';
  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void { }

  segmentChanged = (ev: any) => this.toogle = ev.detail.value;
}
