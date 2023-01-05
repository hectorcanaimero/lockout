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
  @Input() company: any;
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
      company: this.company,
      score_customer: this.score ? this.score : 1,
    };
    this.ms.postMaster('comments', data).subscribe((res: any) => {
      console.log(res);
      this.changeStatusService(res._id);
      this.uService.modalDimiss();
    });
  }

  changeStatusService(commentId: string) {
    this.item.status = 'finished';
    this.item.comment = commentId;
    this.socketService.changeStatus(this.item);
    this.store.dispatch(actions.historyInit({ id: this.company }));
    this.store.dispatch(actions.acceptedInit({ id: this.company }));
    this.store.dispatch(actions.inProcessInit({ id: this.company }));
  }

  onClose = (): Promise<boolean> => this.uService.modalDimiss();
}
