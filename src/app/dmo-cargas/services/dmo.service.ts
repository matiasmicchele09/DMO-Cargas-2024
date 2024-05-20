import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { enviroments } from 'src/environments/environments';

import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DmoService {

  private baseUrl = enviroments.baseUrl;

  constructor(private http: HttpClient){}



  getTrucks(idUser:any):Observable<any>{
    const url = `${ this.baseUrl }/getTrucksUser/${idUser}`;
    const body = { idUser };
    console.log(url);
    console.log(body);

    return this.http.post<any>(url, body)
    .pipe(
      tap(user => {
        console.log("en el dmoservice", user)}
    ))
  }


}
