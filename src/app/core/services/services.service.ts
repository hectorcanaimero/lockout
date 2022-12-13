import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  constructor(private socket: Socket) {}

  getStatus(service: string){
    return this.socket.fromEvent(`service-${service}`);
  }

  sendStatus(message){
    this.socket.emit(`service-${message._id}`, message);
  }
}
