import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { UtilsService } from "@core/services/utils.service";
import { MasterService } from '@core/services/master.service';

@Component({
  selector: 'app-banner-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() uid: string;
  provider$!: Observable<any>;
  constructor(
    private ms:MasterService,
    private uService: UtilsService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.provider$ = this.ms.getMaster(`companies/${this.uid}`);
  }

  onClose (): void {
    this.uService.modalDimiss();
  }
}
