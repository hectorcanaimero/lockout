import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

import { MasterService } from '@core/services/master.service';
import { FireStorageService } from '@modules/chat/services/fire-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoomGatewayService {
  messageBehavior$ = new BehaviorSubject<any>([]);
  message$ = this.messageBehavior$.asObservable();
  constructor(
    private socket: Socket,
    private ms: MasterService,
    private fs: FireStorageService,
  ) {
    socket.on('connect', () => {
      console.log(socket);
      console.log('UID Socket Client ',  socket.ioSocket.id);
    });
    socket.fromEvent('new_message').subscribe( (res: any) => {
      console.log('NADA ', res);
      this.setMessages(res);
    });
  }

  getMessages() {
    return this.socket.fromEvent('new_message');
  }

  sendMessage(payload: { message: string; room: string }) {
    return this.socket.emit('event_chat_message', payload); //TODO FRONT
  }

  joinRoom(room: string): void {
    return this.socket.emit('join_chat', room);
  }

  leaveRoom(room: string): void {
    this.socket.emit('leave_chat', room);
  }

  setMessages(res: any) {
    console.log(res);
    const current = this.messageBehavior$.getValue();
    const state = [...current, res];
    this.messageBehavior$.next(state);
  }

  getAllMessages(uid: string) {
    return this.ms.getMaster(`chat/${uid}`);
  }

  async uploadPhoto(uid: string, src: string) {
    return this.fs.upload(uid, src);
  }
}
