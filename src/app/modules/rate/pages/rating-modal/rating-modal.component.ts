import { Component, Input } from '@angular/core';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { SocketService } from '@core/services/socket.service';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss'],
})
export class RatingModalComponent {

  @Input() item: any;
  num: number;
  data: any = [];
  score: number;
  comment: string = '';

  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private socketService: SocketService,
  ) { }

  getStar (ev: number): void {
    this.score = ev;
  }

  async onSubmit(): Promise<void> {
    await this.uService.load({
      message: 'Tu clasificación es importante para nosotros!',
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
      company: this.item.company._id,
      score_customer: this.score ? this.score : 4,
    };
    this.ms.postMaster('comments', data).subscribe((res) => {
      this.changeStatusService();
      this.uService.modalDimiss();
    });
  }

  changeStatusService() {
    this.item.status = 'finished';
    this.socketService.changeStatus(this.item);
    this.store.dispatch(actions.historyInit({ id: this.item.company._id }));
    this.store.dispatch(actions.acceptedInit({ id: this.item.company._id }));
    this.store.dispatch(actions.inProcessInit({ id: this.item.company._id }));
  }

  onClose = (): Promise<boolean> => this.uService.modalDimiss();
}
