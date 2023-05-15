import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonContent } from '@ionic/angular';
import { Observable, take } from 'rxjs';

import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';
import { ChatFireService } from '@core/services/chat-fire.service';
import { FireStorageService } from '@modules/chat/services/fire-storage.service';

@Component({
  selector: 'app-room-hat',
  templateUrl: 'room.page.html',
  styleUrls: ['room.page.scss'],
})
export class RoomChatPage implements OnInit, AfterViewInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  uid: string;
  activeMessage = false;
  public users = 0;
  public message = '';
  public messages: string[] = [];
  public messages$: Observable<any[]>;
  total: number;
  service: any;

  constructor(
    private uService: UtilsService,
    private storage: StorageService,
    private msService: MasterService,
    private activatedRoute: ActivatedRoute,
    private chatFireService: ChatFireService,
    private storageService: FireStorageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({uid}) => this.getData(uid));
  }

  ngAfterViewInit(): void {
    this.scrollToBottomLabel();
  }

  async onSubmit(): Promise<void> {
    if(this.message) {
      await this.sendMessage('MSG', this.message);
      this.sendPush();
      this.message = '';
      this.total = this.total + 100;
      this.content.scrollToPoint(0, this.total, 0);

    }
  }

  getMessage(uid: string) {
    this.messages$ = this.chatFireService.getMessages(uid);
  }

  scrollToBottomLabel() {
    this.messages$.pipe(take(1)).subscribe((res) => {
      if (res) {
        this.total = (res.length * 140);
        this.content.scrollToPoint(0, this.total, 0);
      }
    })
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
    const data = {
      token: this.service.user.push,
      title: `Tienes un mensaje de ${this.service.company.name}`, //TODO: change translate
      body: `${this.message.slice(0, 50)}...`
    }
    this.msService.postMaster('notification/send', data)
    .subscribe(res => null);
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
    this.getMessage(uid);
    this.uid = uid;this.scrollToBottomLabel();

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
