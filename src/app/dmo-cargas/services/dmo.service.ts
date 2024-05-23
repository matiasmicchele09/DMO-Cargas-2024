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



  getTrucks(idUser:number):Observable<any>{
    const url = `${ this.baseUrl }/getTrucksUser/${idUser}`;
    const body = { idUser };
    return this.http.get<any>(url);
  }

  getTypeTruck(codTypeTruck: number): Observable<any>{
    const url = `${ this.baseUrl }/getOneTypeTruck/${codTypeTruck}`;
    const body = { codTypeTruck };
    return this.http.get<any>(url);

  }


}
