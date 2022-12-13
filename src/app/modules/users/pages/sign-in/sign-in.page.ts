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

  constructor(
    private fb: FormBuilder,
    private db: AuthService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  };

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) { return; }
    await this.uService.load({message: 'Loading...'});
    this.login(this.loginForm.value);
  };

  onSubmitForgotPassword = async () => {
    const form = this.forgotPasswordForm;
    if (form.invalid) { return; }
    await this.uService.load({message: 'Loading...'});
    this.db.forgotSenha(form.value).subscribe(
      async (res) => {
        this.uService.loadDimiss();
        await this.storage.setStorage('oChange', res);
        const opts: AlertOptions = {
          header: 'INFO', buttons: ['Ok'],
          message: 'A code was sent to your email',
        };
        await this.uService.alert(opts);
      }
    );
    this.goToSlides(0);
  };

  loadForm = () => {
    this.loginForm = this.fb.group({
      username: ['aplicativo@condor.com.br', [Validators.required, Validators.email]],
      password: ['admin', [Validators.required, Validators.minLength(4)]],
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
      await this.uService.alert({
        mode:'ios', header: 'Error', buttons: ['OK'],
        message: error.error_description || error.message,
      });
    }))
    .subscribe(async (res: any) => {
      this.uService.loadDimiss();
      await this.storage.setStorage('oAccess', res.access);
      await this.storage.setStorage('oUser', res.user);
      this.store.dispatch(actions.loadUser({ user: res.user }));
      this.uService.navigate('/pages/home');
    });
  }
}
