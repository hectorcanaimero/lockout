import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "@store/app.state";
import { Socket } from "ngx-socket-io";
import { filter, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(
    private socket: Socket,
    private store: Store<AppState>
  ){
    socket.connect();
  }

  getConnection(): any {
    return this.socket.on('connection', data =>
      console.log('CONNECTION', data));
  }

  setJoinRoom(): void {
    this.store.select('company')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.company)
    )
    .subscribe((company: any) => {
      this.socket.emit('joinCompany', company._id);
      this.socket.emit('serviceCompany', company._id);
    });
  }

  onFetchService() {
		return this.socket.fromEvent('changeMessage');
	}

  changeStatus(item: any): any {
    const payload = { id: item._id, item };
    return this.socket.emit('changeStatusService', payload);
  }
}
