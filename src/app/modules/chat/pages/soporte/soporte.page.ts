import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { filter, map, Observable } from 'rxjs';
import { StorageService } from '@core/services/storage.service';
import { ConnectService } from './../../services/connect.service';
import { Router } from '@angular/router';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { ChatFireService } from '@core/services/chat-fire.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FireStorageService } from '@modules/chat/services/fire-storage.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-soporte-chat',
  templateUrl: 'soporte.page.html',
  styleUrls: ['soporte.page.scss'],
})

export class SoporteChatPage implements OnInit {
  @ViewChild('content') content: IonContent;
  user: any = [];
  uid: string;
  activeMessage = false;
  public users = 0;
  public message = '';
  public messages: string[] = [];
  public messages$: Observable<any[]>;

  constructor(
    private router: Router,
    private conn: ConnectService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
    private chatFireService: ChatFireService,
    private storageService: FireStorageService,
    ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const user = await this.storage.getStorage('oUser');
    if(user) {
      this.getMessage(user._id);
      await this.chatFireService.createSoporteRoom(user);
      this.chatFireService.readSoporteMessages(user._id).subscribe(() => null);
      this.user = user;
    }
  }


  async onSubmit(): Promise<void> {
    if(this.message) {
      await this.sendMessage('MSG', this.message);
      this.message = '';
    }
  }

  getMessage(uid: string) {
    this.messages$ = this.chatFireService.getSoporteMessages(uid);
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
    const url = await this.storageService.uploadSoporte(this.user._id, image.dataUrl);
    if(url) await this.sendMessage('IMG', url);
  }

  onClose(): void {
    this.uService.navigate('/pages/menu');
  }

  onEventInput(ev: any) {
    if(ev.length > 0) {
      this.activeMessage = true;
    } else {
      this.activeMessage = false;
    }
  }

  private async sendMessage(type_message: string, message: string) {
    const user: any = await this.storage.getStorage('oUser');
    const payload: Payload = {
      message, owner: user._id, date: new Date(),
      type_user: 1, type_message, view_message: false,
    };
    await this.chatFireService.sendSoporteMessage(payload, user._id);
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
