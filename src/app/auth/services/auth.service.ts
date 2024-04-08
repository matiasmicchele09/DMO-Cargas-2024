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
  private user?: User[]; //*Esta opcional (?) porque en un punto del tiempo no va a existir. Cuando la aplicación se carga por primera vez no va a existir.
//private user?: User[];
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser){
      this.user = JSON.parse(storedUser);
    }
  }

  //*Hacemos un getter para que se pueda acceder al usuario desde fuera del servicio
  get currentUser():User[] | undefined{
    //return this.user
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  set setCurrentUser(user: User[]) {
    console.log(user);
    this.user = user;
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  login(email:string, password: string):Observable<User>{
    const url = `${ this.baseUrl }/logIn`;
    const body = { email, password };
    return this.http.post<User>(url, body)
    .pipe(
      tap(user => {
        console.log("user en authService", user);
        console.log("type", typeof user);
        console.log(this.setCurrentUser[0]);
        this.setCurrentUser[0] = user;
        //localStorage.setItem('token', 'sdfgaADasdfaASDFAdDsasdFADafa')
      })
    )
  }

  logOut():void{
    //this.user = undefined;
    localStorage.clear();

  }
}
