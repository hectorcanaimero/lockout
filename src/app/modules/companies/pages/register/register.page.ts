import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Geolocation } from '@capacitor/geolocation';
import { TranslateService } from '@ngx-translate/core';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { StorageService } from '@core/services/storage.service';
import { DbCompaniesService } from './../../services/db-companies.service';
import { MapsWidgetComponent } from '@modules/companies/widgets/maps/maps.component';


@Component({
  selector: 'app-register-company',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit, AfterViewInit {
  @Input() item: any;
  @Input() modal = false;
  toggle: boolean = false;
  data$: BehaviorSubject<object> =  new BehaviorSubject<object>({});
  @Output() output: EventEmitter<boolean> = new EventEmitter();
  company$: Observable<any[]>;
  companyExist: boolean;
  countries: any = [];
  yenny: any;
  payment = ['Cash', 'Credit Card', 'Transfer Bank', 'Crypto', 'Paypal'];
  typeCompany: number;
  address: any;
  factoryForm: FormGroup;
  types$: Observable<any[]>;
  experts$: Observable<any[]>;
  exist$: Observable<boolean>;
  countries$: Observable<any[]>;
  isMechanics = false;

  constructor(
    private fb: FormBuilder,
    private db: DbCompaniesService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.setForm();
  }

  ngAfterViewInit(): void {
    this.setPosition();
    this.getDataForm();
    this.getAddress();
  }

  getData () {
    this.types$ = this.db.getType();
    this.experts$ = this.db.getCategories();
    this.countries$ = this.db.getCountries();
    this.exist$ = this.store.select('company').pipe(
      filter(row => !row.loading),
      map((res: any) => res.company.name === 'undefined' ? false : true)
    );
  };

  getAddress () {
    this.db.getAddress$().subscribe(
      (res: any) => {
        if (res) {
          this.address = res;
          this.isMechanics = true;
          this.factoryForm.controls.latitude.setValue(res.lat);
          this.factoryForm.controls.longitude.setValue(res.lng);
          this.factoryForm.controls.address.setValue(res.address);
        }
      }
    )
  };

  getDataForm () {
    this.db.getData$().subscribe(
      (res: any) => {
        if (res) {
          this.factoryForm.patchValue(res);
        }
      }
    )
  };

  async onSubmit() {
    const user: any = await this.storage.getStorage('oUser');
    const value = this.factoryForm.value;
    value.user = user._id;
    await this.uService.load({ message: this.translate.instant('PROCCESSING') })
    timer(500).subscribe(() => this.uService.loadDimiss());
    this.create(value);
  };

  setForm = (): void => {
    this.factoryForm = this.fb.group({
      id: [''],
      address: [''],
      latitude: [''],
      longitude: [''],
      name: ['', Validators.required],
      payment: ['', Validators.required],
      categories: ['', Validators.required],
      typeCompany: ['', Validators.required],
    });
  };

  async goToMap(): Promise<void> {
    await this.uService.load({message: this.translate.instant('LOAD_MAP')});
    this.data$.next(this.factoryForm.value);
    this.db.setData$(this.factoryForm.value);
    this.uService.loadDimiss();
    this.uService.modal({
      component: MapsWidgetComponent,
      mode: 'ios',
    })
  }

  onSelectCompany(ev: any) {
    const value: any = ev.detail.value;
    this.types$.subscribe((res: any) => {
      const active = res.filter((row: any) => row._id === value)[0];
      this.isMechanics = this.activeAddress(active.name);
    })
  }

  onTypeCompany(ev: any) {
    this.typeCompany = ev.detail.value.type;
  }

  private activeAddress(name: string) {
    if (name === 'MECHANICAL') {
      return false;
    }
    return true;
  }
  private create = (item: any) => {
    this.db.registerCompany(item).subscribe(
      async () => {
        this.store.dispatch(actions.loadCompany({ user: item.user }));
        this.uService.loadDimiss();
        await this.uService.alert({
          header: 'Info', message: this.translate.instant('COMPANY_SUCCESS'),
          mode: 'ios', buttons: ['OK']
        });
        this.uService.navigate('/pages/home');
      },
      async(error) => {
        await this.uService.alert({
          header: 'Error', message: error.message,  
          mode: 'ios', buttons: ['OK']
        });
      }
    );
  };

  private setPosition = async(): Promise<void> => {
    const position = await Geolocation.getCurrentPosition();
    if (position) {
      this.db.setPosition$(position);
    } else {
      await this.uService.alert({
        header: 'Info',
        message: this.translate.instant('LOCATION_ACTIVE'),
        mode: 'ios',
        buttons: ['OK']
      });
    }
  };
}
