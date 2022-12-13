import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})

export class GeolocationService {

  constructor() {
    Geolocation.checkPermissions().then((res) => {
      console.log(res);
    });
  }

  requestPermissions = () => {
    Geolocation.requestPermissions().then((res) => console.log(res));
  };

  currentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    return coordinates;
  };
}
