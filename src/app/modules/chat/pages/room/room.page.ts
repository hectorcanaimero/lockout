import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';

import { UtilsService } from '@core/services/utils.service';
import { StorageService } from '@core/services/storage.service';
import { ChatFireService } from '@core/services/chat-fire.service';
import { FireStorageService } from '@modules/chat/services/fire-storage.service';
import { SocketService } from '@core/services/socket.service';
import { MasterService } from '@core/services/master.service';

@Component({
  selector: 'app-room-hat',
  templateUrl: 'room.page.html',
  styleUrls: ['room.page.scss'],
})
export class RoomChatPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  uid: string;
  activeMessage = false;
  public users = 0;
  public message = '';
  public messages: string[] = [];
  public messages$: Observable<any[]>;
  service: any;

  constructor(
    private uService: UtilsService,
    private storage: StorageService,
    private msService: MasterService,
    private socketService: SocketService,
    private activatedRoute: ActivatedRoute,
    private chatFireService: ChatFireService,
    private storageService: FireStorageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({uid}) => this.getData(uid));
  }

  async onSubmit(): Promise<void> {
    if(this.message) {
      await this.sendMessage('MSG', this.message);
      this.sendPush();
      this.message = '';
    }
  }

  getMessage(uid: string) {
    this.messages$ = this.chatFireService.getMessages(uid);
    this.scrollToBottomLabel();
  }

  scrollToBottomLabel() {
    const id = document.getElementById('id-0');
    // console.log(id);
    // this.content.scrollToPoint(0,id.offsetTop-60,700);
  }

  async setCamera() {
    const image = await Camera.getPhoto({
      width: 500,
      height: 500,
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    const url = await this.storageService.upload(this.uid, image.dataUrl);
    if(url) await this.sendMessage('IMG', url);
  }

  onClose(): void {
    this.uService.navigate('pages/home');
  }

  onEventInput(ev: any) {
    if(ev.length > 0) {
      this.activeMessage = true;
    } else {
      this.activeMessage = false;
    }
  }

  sendPush() {
    console.log(this.service);
    const data = {
      token: this.service.user.push,
      title: `Tienes un mensaje de ${this.service.company.name}`,
      body: `${this.message.slice(0, 50)}...`
    }
  }

  private async sendMessage(type_message: string, message: string) {
    const { _id }: any = await this.storage.getStorage('oUser');
    const payload: Payload = {
      message, owner: _id, date: new Date(),
      type_user: 1, type_message, view_message: false,
    };
    await this.chatFireService.sendMessage(payload, this.uid);
  }

  private getData(uid: string) {
    this.uid = uid;
    this.getMessage(uid);
    this.chatFireService.readMessages(uid)
      .subscribe(() => null);
    this.msService.getMaster(`services/${uid}`)
      .subscribe((res: any) => this.service = res);
  }

}

export interface Payload {
  message: string;
  owner:string;
  date: Date;
  type_user: number;
  type_message: string;
  view_message: boolean;
}
