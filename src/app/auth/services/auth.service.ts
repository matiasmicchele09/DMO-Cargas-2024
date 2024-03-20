import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { enviroments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = enviroments.baseUrl;
  private user?: User; //*Esta opcional (?) porque en un punto del tiempo no va a existir. Cuando la aplicación se carga por primera vez no va a existir.

  constructor(private http: HttpClient) { }


  //*Hacemos un getter para que se pueda acceder al usuario desde fuera del servicio
  get currentUser():User | undefined{
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email:string, password: string):Observable<User>{
    const url = `${ this.baseUrl }/logIn`;
    const body = { email, password };
    return this.http.post<User>(url, body)
    .pipe(
      tap(user => {
        this.user = user;
        console.log(user);
        //localStorage.setItem('token', 'sdfgaADasdfaASDFAdDsasdFADafa')
      })
    )
  }
}
