import { Component, Input, OnInit } from "@angular/core";
import { MasterService } from "@core/services/master.service";
import { UtilsService } from "@core/services/utils.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-banner-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() uid: string;
  company$!: Observable<any>;

  constructor(
    private ms: MasterService,
    private uService: UtilsService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.company$ = this.ms.getMaster(`companies/${this.uid}`);
    this.company$.subscribe(res => console.log(res));
  }

  onClose() {
    this.uService.modalDimiss();
  }
}
