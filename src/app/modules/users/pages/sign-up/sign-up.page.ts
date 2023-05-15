import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
    { name: 'Español', id: 'es' },
    { name: 'Ingles', id: 'en' },
    { name: 'Portugues', id: 'pt' }
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private ms: MasterService,
    private uService: UtilsService,
    private storage: StorageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    console.log(this.registerForm);
  }

  getData() {
    this.loadForm();
    this.countries$ = this.ms.getMaster('tables/countries');
  }

  async onSubmit (): Promise<any> {
    const data: any = this.registerForm.value;
    const push: string = await this.storage.getStorage('oPush');
    data.push = push ? push : null;
    if(!data.term || !data.lgpd) {
      await this.uService.alert({
        mode: 'ios',
        message: this.translate.instant('SIGN.ERROR_TERM_LGPD'),
        buttons: ['OK']
      })
      return;
    }
    await this.getDataForm();
    await this.uService.load({ message: this.translate.instant('PROCCESSING')});
    this.auth.signUp(data)
    .pipe(
      catchError(async (error) => {
        this.uService.loadDimiss();
        this.setAlert(error);
      })
    )
    .subscribe(async () => {
      this.translate.use(data.language);
      await this.setToast();
      this.uService.loadDimiss();
    });
  };

  loadForm = () => {
    this.registerForm = this.fb.group({
      picture: [''],
      type_user: [1],
      lgpd: [, Validators.required],
      term: [, Validators.required],
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

  private getDataForm(): void {
    this.constructImage();
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
      message: this.translate.instant('SIGN.ACCOUNT_CREATED'),
      position: 'top', duration: 1000
    });
    this.uService.navigate('/user/signIn');
  };

  private async setAlert(error: any) {
    return this.uService.alert(
      {
        mode: 'ios',
        header: this.translate.instant('ERROR'),
        message: error.response.errorMessage,
        buttons: ['OK']
      }
    );
  }
}
