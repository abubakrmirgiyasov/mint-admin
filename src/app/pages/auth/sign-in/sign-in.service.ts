import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { getAccessToken } from '@core/helpers/jwt-decode.helper';

interface ISignInResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private readonly http: HttpClient) {}

  submit<T>(data: T): Observable<ISignInResponse> {
    return this.http.post<ISignInResponse>('/admin/authentication/signIn', data);
  }

  isAuthenticated(): boolean {
    return !!getAccessToken();
  }
}
