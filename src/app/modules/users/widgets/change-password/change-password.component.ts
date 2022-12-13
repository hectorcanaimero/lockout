import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';
import { AuthService } from '@modules/users/services/auth.service';
import { catchError } from 'rxjs';

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
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  async onSubmit(): Promise<void>{
    await this.uService.load({ message: 'Procesando...'});
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
          header: 'Error',
          message: error.message,
          buttons:['OK']
        });
      })
    )
    .subscribe(
      async () => {
        this.uService.loadDimiss();
        await this.uService.alert({
          header: 'Mensaje',
          message: 'Su contraseña fue cambiada con éxito!',
          buttons:['OK']
        });
      }
    );
  }
  private async validateSenha(): Promise<void> {
    const value = this.changeForm.value;
    if (value.pass === value.newpass) {
      await this.uService.alert({
        header: 'Error',
        message: 'Su nuevo password es igual al actual,por favor creau un nuevo password',
        buttons: ['OK'],
      });
    }
  }
}
