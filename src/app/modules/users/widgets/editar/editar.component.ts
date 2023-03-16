import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '@modules/users/services/auth.service';
import { Store } from '@ngrx/store';
import { catchError, Observable, subscribeOn, tap, timer } from 'rxjs';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  @Input() user: any;
  registerForm: FormGroup;
  countries$: Observable<any[]>;
  idioma = [
    { name: 'Español', id: 'es' },
    { name: 'Inglés', id: 'en' },
    { name: 'Portugués', id: 'pt' },
  ];

  constructor(
    private fb: FormBuilder,
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.getData();
    timer(500).subscribe(() => {
      console.log(this.user);
      this.loadData();
    });
  }
  
  getData() {
    this.loadForm();
    this.countries$ = this.ms.getMaster('tables/countries');

  }

  async onSubmit(): Promise<void> {
    if(this.registerForm.invalid) return;
    const data = this.registerForm.value;
    await this.uService.load({message: this.translate.instant('PROCCESSING')});
    this.processingData(this.user._id, data);
  };

  loadForm = () => {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      language: ['', Validators.required]
    });
  };

  loadData() {
    if (this.user) {
      const res = this.user;
      this.registerForm.patchValue({
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
        phone: res.phone,
        country: res.country._id,
        language: res.language
      });
    }
  }

  private processingData(id: string, data: any) {
    this.ms.patchMaster(`users/${id}`, data)
    .pipe(
      tap(() => this.uService.loadDimiss()),
      catchError(async (error: any) => this.alertError(error))
    )
    .subscribe(async (user: any) => this.setData(user))
  }

  private async setData(user) {
    this.translate.use(user.language);
    this.store.dispatch(actions.loadUser(user));
    await this.storage.removeStorage('oUser');
    await this.storage.setStorage('oUser', user);
    this.uService.navigate('pages/home');
  } 

  private async alertError(error: any) {
    return this.uService.alert({
      header: this.translate.instant('ERROR'),
      message: error.message,
      buttons:['OK']
    });
  }
}
