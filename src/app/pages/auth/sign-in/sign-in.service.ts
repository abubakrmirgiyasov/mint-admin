import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ACCESS_TOKEN} from "@core/helpers/constants/storage.constants";

interface ISignInResponse {
  token: string;
}

@Injectable()
export class SignInService {

  constructor(
    private http: HttpClient
  ) { }

  submit<T>(data: T): Observable<ISignInResponse> {
    return this.http.post<ISignInResponse>('/admin/authentication/signIn', data);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN);
  }

}
