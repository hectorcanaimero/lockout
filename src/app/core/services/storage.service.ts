import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  setStorage = async (key: string, value: any) => {
    await Preferences.set({ key, value: JSON.stringify(value)});
  };

  getStorage = async (key: string) => {
    const item: any = await Preferences.get({ key });
    return JSON.parse(item.value);
  };

  removeStorage = async (key: string) => {
    await Preferences.remove({ key });
  };

  clearStorages = async () => {
    await Preferences.clear();
  };
}
