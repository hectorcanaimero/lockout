import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

import { AlertOptions, IonSlides } from '@ionic/angular';
import { Store } from '@ngrx/store';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { AuthService } from '@modules/users/services/auth.service';
import { UtilsService } from '@core/services/utils.service';
import { StorageService } from '@core/services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { duration } from 'moment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})

export class SignInPage implements OnInit, AfterViewInit {
  @ViewChild('slides') slides: IonSlides;
  options = { initialSlide: 0, };
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  active = true;
  constructor(
    private fb: FormBuilder,
    private db: AuthService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  ngAfterViewInit() { };

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) { return; }
    await this.uService.load({message: this.translate.instant('PROCCESSING')});
    this.login(this.loginForm.value);
  };

  onSubmitForgotPassword = async () => {
    const form = this.forgotPasswordForm;
    if (form.invalid) { return; }
    await this.uService.load({message: this.translate.instant('PROCCESSING'), duration: 700});
    this.db.forgotSenha(form.value).subscribe(
      async (res) => {
        await this.storage.setStorage('oChange', res);
        const opts: AlertOptions = {
          header: 'INFO', buttons: [
            {
              text: 'OK',
              handler: () => this.active = true,
            },
          ],
          message: this.translate.instant('SIGN.MESSAGE_FORGOT'),
        };
        await this.uService.alert(opts);
      }
    );
  };

  loadForm = () => {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.forgotPasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
    });
  };

  goToSlides = (slide: number) => {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slide);
    this.slides.lockSwipes(true);
  };

  onRegister = () => this.uService.navigate('/user/signUp');

  login(data: any) {
    this.db.signIn(data)
    .pipe(catchError(async (error: any) => {
      this.uService.loadDimiss();
      console.log(error);
      await this.uService.alert({
        mode:'ios', 
        header: this.translate.instant('ERROR'), 
        buttons: ['OK'],
        message: this.translate.instant(error.error.error_description || error.error.message),
      });
    }))
    .subscribe(async (res: any) => {
      const user = res.user._id;
      console.log(user);
      this.uService.loadDimiss();
      this.translate.use(res.user.language);
      await this.storage.setStorage('oUser', res.user);
      await this.storage.setStorage('oAccess', res.access);
      this.store.dispatch(actions.loadUser({ user: res.user }));
      // this.store.dispatch(actions.loadCompany({ user }));
      this.uService.navigate('/pages/home');
    });
  }
}
