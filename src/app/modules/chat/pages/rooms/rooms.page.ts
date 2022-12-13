import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonGrid, IonList, NavController, IonRow } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Observable, timer } from 'rxjs';
import { ConnectService } from '@modules/chat/services/connect.service';
import { FireStorageService } from '@modules/chat/services/fire-storage.service';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-rooms-chat',
  templateUrl: 'rooms.page.html',
  styleUrls: ['rooms.page.scss'],
})
export class RoomsChatPage implements OnInit, AfterViewInit {

  @ViewChild('mic', { read: ElementRef }) mic: ElementRef;
  @ViewChild(IonGrid, { read: ElementRef }) list: ElementRef;
  @ViewChild('#content', { static: false }) content: IonContent;
  public company: number;
  recording = false;
  messageToogle = false;
  storedFileNames = [];
  durationDisplay = '';
  duration: number;
  uid: any;
  message: string;
  toogleMessage = false;
  format = 'dd/MM HH:mm';
  items$: Observable<any[]>;
  photo: any;
  openPopover = false;
  name: string;

  constructor(
    private conn: ConnectService,
    private active: ActivatedRoute,
    private navCtrl: NavController,
    private fs: FireStorageService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.active.params.subscribe(({uid}) => this.uid = uid);
  }

  ngAfterViewInit() {
    this.initChat(this.uid);
    this.scrollToBottomOnInit();
  }

  scrollToBottomOnInit = () => {
    timer(1000).subscribe(() => {
      const children: any = this.list.nativeElement.children;
      const total = children.length - 1;
      const item = children[total];
      item.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  };


  initChat(uid: any) {
    this.getCompany().subscribe(res => {
      this.name = res.name;
      this.company = res.id;
      this.items$ = this.conn.getMessagesServiceChat(res.id, uid);
      this.conn.readMessageServiceChat(res.id, uid).subscribe((read: boolean) => console.log('CONN '));
    });
  }
  sendMessage() {
    if (this.message.length === 0) { return; }
    this.conn.sendMessageServiceChat(this.uid, this.company, this.message);
    this.message = '';
    this.toogleMessage = false;
    this.scrollToBottomOnInit();
  }

  sendMessageKeypress(ev: any) {
    if (ev !== 13) { return; }
    this.sendMessage();
  }

  txtMessage(ev: any) {
    const value = ev.detail.value;
    if (value > 0 || value === '') this.toogleMessage = false;
    else this.toogleMessage  = true;
  }

  onClose = () => this.navCtrl.navigateRoot('');


  cameraGet = async () => {
    const image = await Camera.getPhoto({
      width: 600, height: 600, quality: 60, allowEditing: false, resultType: CameraResultType.DataUrl
    });
    const url = await this.fs.upload(this.uid, image.dataUrl);
    this.conn.sendMessageServiceChat(this.uid, this.company, url, 'IMG');
  };

  openPop = (url: string) => {
    this.openPopover = true;
  };

  private getCompany = () =>
    this.store.select('company')
    .pipe(filter((row: any) => !row.loading), map((res: any) => res.company));
}
