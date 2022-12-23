import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '@modules/users/services/auth.service';
import { Store } from '@ngrx/store';
import { catchError, Observable, subscribeOn, timer } from 'rxjs';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
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
    { id: 1, name: 'Español (Latinoamerica)', iso: 'es' },
  ];

  constructor(
    private fb: FormBuilder,
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
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
    if(this.registerForm.invalid) { return; }
    const data = this.registerForm.value;
    await this.uService.load({message: 'Procesando...'});
    await this.storage.setStorage('language', data.language);
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
      this.registerForm.controls.first_name.setValue(res.first_name);
      this.registerForm.controls.last_name.setValue(res.last_name);
      this.registerForm.controls.email.setValue(res.email);
      this.registerForm.controls.phone.setValue(res.phone);
      this.registerForm.controls.country.setValue(res.country);
      this.registerForm.controls.language.setValue(+res.language);
    }
  }

  private processingData(id: string, data: any) {
    this.ms.patchMaster(`users/${id}`, data)
    .pipe(
      catchError(async (error: any) => {
        this.uService.loadDimiss();
        await this.uService.alert({
          header: 'Error',
          message: error.message,
          buttons:['OK']
        });
      })
    )
    .subscribe(
      (user: any) => {
        this.uService.loadDimiss();
        this.store.dispatch(actions.loadUser(user));
      },
    );
  }
}
