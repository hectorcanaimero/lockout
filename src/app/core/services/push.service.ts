import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { MasterService } from '@core/services/master.service';
import { AnyFn } from '@ngrx/store/src/selector';


@Injectable({
  providedIn: 'root'
})
export class PushService {
  constructor(
    private ms: MasterService,
    private storage: StorageService
    ) { }


  initPush = async () => {
    this.registerNotifications();
    this.addListeners();
    this.getDeliveredNotifications();
  }

  registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
    await PushNotifications.register();
  }

  addListeners = () => {
    PushNotifications.addListener('registration', async (token: any) => {
      await this.storage.setStorage('oPush', token.value);
      await this.updateToken(token);
    });
    PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
    PushNotifications.addListener('pushNotificationReceived',
    async (notification: PushNotificationSchema): Promise<void> => {
      console.log('Push notification received: ', notification);
      // await this.setLocalNotification(notification);
      if (!notification.data.type) {
        await this.savePushStorage(notification);
      }
    });
    PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }

  getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

  updateToken = async (token: any)=>{
    const push = await this.storage.getStorage('push');
    if(token && push !== token) {
      this.ms.changeToken(token.value).subscribe(() => null);
    }
  }
  private async savePushStorage(item) {
    const data: string[] = await this.storage.getStorage('pushs');
    data.push(...item);
    const setData = await this.storage.setStorage('pushs', data);
  }

  private async setLocalNotification(item: any) {
    let payload: ScheduleOptions = {
      notifications: [{
        id: Date.now(),
        body: item.body,
        title: item.title,
        ongoing: false,
      }]
    };
    await LocalNotifications.schedule(payload)
  }
}