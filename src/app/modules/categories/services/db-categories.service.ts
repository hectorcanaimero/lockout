import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import { Geolocation } from '@capacitor/geolocation';
import { from, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbCategoriesService {
  constructor(
    private ms: MasterService
  ) {}

  getIcone = () => this.ms.getMaster('master/expert/');
  getBrand = () => this.ms.getMaster('master/vehicle-brand/');
  getModel = () => this.ms.getMaster('master/vehicle-model/');
  getVehicles = () => this.ms.getMaster('master/types-vehicle/');
  getTypeCondition = () => this.ms.getMaster('master/vehicle-condition/');

  setServices(data: any) {
    return this.ms.postMaster(`service/request/add/`, data);
  }

  getServices(id: number) {
    return this.ms.getMaster(`service/request/list/${id}/`);
  }

  statusService(id: any, status: string, company: number) {
    return this.ms.patchMaster(`service/company/${id}`, { status, company });
  }
  finishService(service: number, company: number, data: any) {
    return this.ms.patchMaster(`service/company/${service}?company=${company}`, data);
  }
}
