import { Component, OnInit } from '@angular/core';
import { AlertOptions } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Observable, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { DbCompaniesService } from '@modules/companies/services/db-companies.service';

// declare const google: any;

@Component({
  selector: 'app-user-maps-widget',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsWidgetComponent implements  OnInit {
  private geoCoder;

  lat: number;
  lng: number;
  address: string;
  showMaps = false;
  position$: Observable<Position>;

  constructor(
    private store: Store<AppState>,
    private db: DbCompaniesService,
    private uService: UtilsService,
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.geoCoder = new google.maps.Geocoder();
    await this.updatePosition();
  }

  updatePosition = async (): Promise<void> => {
    const position = await Geolocation.getCurrentPosition();
    if (!this.lat) {
      this.db.setPosition$(position);
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    } else {
      this.db.getPosition$().subscribe(res => {
        this.lat = res.coords.latitude;
        this.lng = res.coords.longitude;
      });
    }
    this.getAddress(this.lat, this.lng);
  }

  setOnAddress = (ev: google.maps.MouseEvent) => {
    this.lat = ev.latLng.lat();
    this.lng = ev.latLng.lng();
    this.getAddress(this.lat, this.lng);
  }
  getAddress = async (lat: number, lng: number) => {
    this.geoCoder.geocode({ 'location': { lat, lng } },
    async (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        }
        else {
          await this.uService.alert(this.onSetError('No se encontro ningun resultado.'))
        }
      } else {
        await this.uService.alert(this.onSetError('Geocode fallo ' + status))
      }
    });
  };

  onClose = async (): Promise<void> => {
    this.db.setAddress$({lat: this.lat, lng: this.lng, address: this.address});
    await this.uService.load({ message: 'Salvando información de ubicación', duration: 1500 });
    timer(1700).subscribe(() => this.uService.navigate('register-company'));
  }

  private onSetError(message) {
    const alert: AlertOptions = { header: 'Error', mode: 'ios', message, buttons: ['OK'] };
    return alert;
  }
}

