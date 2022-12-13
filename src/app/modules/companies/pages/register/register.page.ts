import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '@store/app.state';
import * as actions from '@store/actions';

import { MapsWidgetComponent } from './../../widgets/maps/maps.component';
import { DbCompaniesService } from './../../services/db-companies.service';
import { UtilsService } from '@core/services/utils.service';
import { runInThisContext } from 'vm';
import { StorageService } from '@core/services/storage.service';


@Component({
  selector: 'app-register-company',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit, AfterViewInit {
  @Input() item: any;
  @Input() modal = false;
  @Output() output: EventEmitter<boolean> = new EventEmitter();
  company$: Observable<any[]>;
  companyExist: boolean;
  countries: any = [];
  yenny: any;
  payment = ['Cash', 'Credit Card', 'Transfer Bank', 'Crypto', 'Paypal'];


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
    private storage: StorageService
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

  getData = () => {
    this.types$ = this.db.getType();
    this.experts$ = this.db.getCategories();
    this.countries$ = this.db.getCountries();
    this.exist$ = this.store.select('company').pipe(
      filter(row => !row.loading),
      map((res: any) => res.company.name === 'undefined' ? false : true)
    );
  };

  getAddress = () => {
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

  getDataForm = () => {
    this.db.getData$().subscribe(
      (res: any) => {
        if (res) {
          this.factoryForm.patchValue(res);
        }
      }
    )
  };

  onSubmit = async () => {
    const user: any = await this.storage.getStorage('oUser');
    const value = this.factoryForm.value;
    value.user = user._id;
    await this.uService.load({ message: 'Procesando...' })
    timer(2000).subscribe(() => this.uService.loadDimiss());
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

  goToMap = async (): Promise<void> => {
    await this.uService.load({message: 'Cargando tu ubicación en el mapa...'});
    this.db.setData$(this.factoryForm.value);
    this.uService.loadDimiss();
    this.uService.navigate('register-mapa');
  }

  onSelectCompany(ev: any) {
    const value: any = ev.detail.value;
    this.types$.subscribe((res: any) => {
      const active = res.filter((row: any) => row._id === value)[0];
      this.isMechanics = this.activeAddress(active.name);
    })
  }

  private activeAddress(name: string) {
    if (name === 'MECHANICAL') {
      return false;
    }
    return true;
  }
  private create = (item: any) => {
    this.db.registerCompany(item).subscribe(
      async (res: any) => {
        this.store.dispatch(actions.loadCompany({ user: item.user }));
        this.uService.loadDimiss();
        await this.uService.alert({
          header: 'Info', message: 'Company Created!',
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
        header: 'Aviso',
        message: 'Es necesario que su Localizacion este activa',
        mode: 'ios',
        buttons: ['OK']
      });
    }
  };
}
