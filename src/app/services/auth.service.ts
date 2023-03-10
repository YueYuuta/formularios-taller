import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    // const body = { email, password };
    if (email === 'jcjunior308@gmail.com' && password === '123456*Jj') {
      return of({ user: 1 });
    }
    return throwError(() => new Error('usuario invalido!'));
  }
}
