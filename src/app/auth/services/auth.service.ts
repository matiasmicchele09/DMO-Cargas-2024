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
  //private user?: User; //*Esta opcional (?) porque en un punto del tiempo no va a existir. Cuando la aplicación se carga por primera vez no va a existir.
  private userKey = 'currentUser'

  constructor(private http: HttpClient) { }

    //*Hacemos un getter para que se pueda acceder al usuario desde fuera del servicio
  get currentUser():User | undefined{
    const userString = localStorage.getItem(this.userKey)
    //if (!this.user) return undefined;
    //console.log(this.user);
    //return this.user
    //return structuredClone(this.user);
    return userString ? JSON.parse(userString) : undefined;
  }


  set setCurrentUser(user: User) {
    console.log(user);
    //this.user = user;
  }

  login(email:string, password: string):Observable<User>{
    const url = `${ this.baseUrl }/logIn`;
    const body = { email, password };
    return this.http.post<User>(url, body)
    .pipe(
      tap(user => {
        ///this.user = user;
        //setCurrentUser(user);
        //localStorage.setItem("usuario",JSON.stringify(this.user))
        localStorage.setItem('token', 'sdfgaADasdfaASDFAdDsasdFADafa')
      //  console.log(user);
        //localStorage.setItem('token', 'sdfgaADasdfaASDFAdDsasdFADafa')
      })
    )
  }
}
