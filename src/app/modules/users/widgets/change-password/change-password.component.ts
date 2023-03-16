import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs';

import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';
import { AuthService } from '@modules/users/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @Input() user: any;
  changeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: AuthService,
    private uService: UtilsService,
    private storage: StorageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  async onSubmit(): Promise<void>{
    await this.uService.load({ message: this.translate.instant('PROCCESSING')});
    this.validateSenha();
    this.processingData(this.changeForm.value.newpass);
    this.changeForm.reset();
  };

  loadForm = () => {
    this.changeForm = this.fb.group({
      pass: ['', [Validators.required, Validators.minLength(4)]],
      newpass: ['', [Validators.required, Validators.minLength(4)]],
    });
  };
  private async processingData(newPass: string): Promise<void> {
    const { email }: any = await this.storage.getStorage('oUser');
    const data = { username: email, password: newPass };
    this.db.changePassword(data)
    .pipe(
      catchError(async (error: any) => {
        this.uService.loadDimiss();
        await this.uService.alert({
          header: this.translate.instant('ERROR'),
          message: error.message,
          buttons:['OK']
        });
      })
    )
    .subscribe(
      async () => {
        this.uService.loadDimiss();
        await this.uService.alert({
          header: 'INFO',
          message: this.translate.instant('USER.SHOW_MESSAGE'),
          buttons:['OK']
        });
      }
    );
  }
  private async validateSenha(): Promise<void> {
    const value = this.changeForm.value;
    if (value.pass === value.newpass) {
      await this.uService.alert({
        header: this.translate.instant('ERROR'),
        message: this.translate.instant('USER.SHOW_MESSAGE_SUCCESS'),
        buttons: ['OK'],
      });
    }
  }
}
