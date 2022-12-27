import { catchError } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Observable } from 'rxjs';

import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';
import { AuthService } from '@modules/users/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, AfterViewInit {

  registerForm: FormGroup;
  avatar: any;
  countries$: Observable<any[]>;
  idioma = [
    { name: 'Español (Latinoamerica)', id: 1 },
    { name: 'Ingles (USA)', id: 2 },
    { name: 'Portugues (Brasil)', id: 3 }
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private ms: MasterService,
    private uService: UtilsService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() { }

  getData() {
    this.loadForm();
    this.countries$ = this.ms.getMaster('tables/countries');
  }

  onSubmit = async () => {
    if(this.registerForm.invalid) { return; }
    const data = this.registerForm.value;
    await this.getDataForm(data);
    await this.uService.load({ message: 'Procesando...' });
    this.auth.signUp(this.registerForm.value)
    .pipe(
      catchError(async (error) => {
        this.uService.loadDimiss();
        await this.uService.alert(
          {
            mode: 'ios',
            header: 'Error',
            message: error.response.errorMessage,
            buttons: ['OK']
          }
        );
      })
    )
    .subscribe(
      async () => {
        this.uService.loadDimiss();
        await this.setToast();
      });
  };

  loadForm = () => {
    this.registerForm = this.fb.group({
      picture: [''],
      type_user: [1],
      language: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
    });
  };

  async takePicture(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 80, allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.avatar =  image.dataUrl;
  };

  private async getDataForm(data: any): Promise<void> {
    this.constructImage();
    await this.storage.setStorage('language', data.language);
  };

  onBack (): Promise<boolean> {
    return this.uService.navigate('user/signIn');
  }

  private constructImage(): void {
    if (this.avatar) {
      this.registerForm.controls.picture.setValue(this.avatar);
    } else {
      this.registerForm.controls.picture.setValue('');
    }
  };

  private setToast = async (): Promise<void> => {
    await this.uService.toast({
      message: 'Cuenta creada, ahora accede con tu usuario y contraseña',
      position: 'top', duration: 1000
    });
    this.uService.navigate('/user/signIn');
  };
}
