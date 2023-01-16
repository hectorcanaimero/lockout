import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { StorageService } from '@core/services/storage.service';

const url = environment.stripe;

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  // createCustomer = (data: any) => this.http.post(`${url}/customer`, data);
  getCustomerByEmail = (email: string) => this.http.post(`${url}/customer/email`, { email });
  getConfig = () => this.http.get(`${url}/orders/config`);

  getCheckout = (customer: string, price: string) => this.http.post(`${url}/orders/checkout`, { customer, price });

  createSubscription = (data: any) => this.http.post(`${url}/subscription`, data)
  getSubscription = (uid: string) => this.http.get(`${url}/subscription/${uid}`)

  refreshOCustomer = async (data: any) => {
    let value: any;
    const item: any = await this.storageService.getStorage('oCustomer');
    if (item.customer !== data.customer) {
      value= data;
    } else {
      if (!item.subscription) {
      }
    }
    await this.storageService.setStorage('oCustomer', data);
  };
}
