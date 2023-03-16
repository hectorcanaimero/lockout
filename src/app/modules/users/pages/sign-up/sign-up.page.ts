import { StripeService } from '@core/services/stripe.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Observable } from 'rxjs';

import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { AuthService } from '@modules/users/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService,
    private stripeService: StripeService,
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
    await this.uService.load({ message: this.translate.instant('PROCCESSING')});
    this.auth.signUp(this.registerForm.value)
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
      lgpd: ['', Validators.required],
      term: ['', Validators.required],
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
