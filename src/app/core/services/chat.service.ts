import { Injectable } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatBehavior$ = new BehaviorSubject<any>([]);
  chat$ = this.chatBehavior$.asObservable();

  constructor(
    private socket: Socket,
    private ms: MasterService,
  ) {

  }

  public setChat(message: any): void {
    const current = this.chatBehavior$.getValue();
    const state = [...current, message];
    this.chatBehavior$.next(state);
  }

  //TODO Enviar mensaje desde el FRONT-> BACKEND
  sendMessage(payload: { message: string; room: string }) {
    this.socket.emit('event_chat_message', payload); //TODO FRONT
  }

  joinRoom(room: string): void {
    this.socket.emit('event_chat', room);
  }

  leaveRoom(room: string): void {
    this.socket.emit('chat', room);
  }

  getMessage() {
    return this.socket.fromEvent('chat');
  }

  uploadPhoto(src: string) {
    return this.ms.postMaster('chat/upload-photo', { src });
  }
}
