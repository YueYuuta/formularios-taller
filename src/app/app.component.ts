import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Ejercicio #1 de formularios reactivos';
  subTitle =
    'Estamos creando este ejercicio para comenzar a aprender sobre formularios reactivos';
  dataSession: any;
  form: FormGroup = new FormGroup({});
  isCheck: any;
  checkHuman: Array<any> = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService, //TODO: Login HTTP
    private readonly dataService: DataService //TODO: Matematica
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.password()]],
      result: ['', [Validators.required]],
    });

    this.checkHuman = this.dataService.generateNumbers(); //TODO: [1,2]
  }

  sendLogin(): void {
    const [numberA, numberB] = this.checkHuman; //TODO: [1,2]
    const result = this.form.value.result;
    const check = this.dataService.checkOperation(numberA, numberB, result);
    if (!check) {
      this.isCheck = 'ERROR_CHECK';
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.authService.login(email, password).subscribe({
      next: (res: any) => (this.dataSession = res), //TODO: Objecto usuario
      error: (err: any) => (this.isCheck = 'ERROR_USER'),
    });
  }

  password(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let value: string = control.value;
      if (value) {
        const valid = value.match(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        );
        return valid ? null : { password: true };
      }
      return null;
    };
  }
}
