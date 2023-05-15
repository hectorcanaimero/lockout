import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { SocketService } from '@core/services/socket.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss'],
})
export class RatingModalComponent implements OnInit {

  @Input() item: any;
  num: number;
  score: number;
  data: any = [];
  comment: string = '';

  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private socketService: SocketService,
    private translate: TranslateService,
  ) { }
  ngOnInit(): void { }

  getStar (ev: number): void {
    this.score = ev;
  }

  async onSubmit(): Promise<void> {
    await this.uService.load({
      message: this.translate.instant('RATE'),
      duration: 2000
    });
    this.createComment();
    this.uService.modalDimiss();
    this.uService.loadDimiss();
    this.uService.navigate('/pages/home');
  }

  createComment() {
    const data = {
      service: this.item._id,
      comment_customer: this.comment,
      company: this.item.company.user._id,
      user: this.item.user._id,
      score_customer: this.score ? this.score : 1,
    };
    this.ms.postMaster('comments', data).subscribe((res: any) => {
      this.changeStatusService(res._id);
      this.loadServiceInStore(this.item.company._id);
      this.uService.modalDimiss();
    });
  }

  changeStatusService(commentId: string) {
    this.item.status = 'finished';
    this.item.comment = commentId;
    this.socketService.changeStatus(this.item);
    this.store.dispatch(actions.historyInit({ id: this.item.company._id }));
    this.store.dispatch(actions.acceptedInit({ id: this.item.company._id }));
    this.store.dispatch(actions.inProcessInit({ id: this.item.company._id }));
  }

  onClose = (): Promise<boolean> => this.uService.modalDimiss();
  
  private loadServiceInStore(id: string) {
    timer(300).subscribe(() => {
      this.store.dispatch(actions.load({ company: id }))
      this.store.dispatch(actions.inProcessInit({ id }));
      this.store.dispatch(actions.acceptedInit({ id }));
    });
  }
}
