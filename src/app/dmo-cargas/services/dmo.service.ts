import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { enviroments } from 'src/environments/environments';

import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DmoService {

  private baseUrl = enviroments.baseUrl;

  constructor(private http: HttpClient){}



  //* Camiones del usuario
  getTrucks(idUser:number):Observable<any>{
    const url = `${ this.baseUrl }/getTrucksUser/${idUser}`;
    return this.http.get<any>(url);
  }

  //* Tipo de camiones del usuario
  getTypeTruck(codTypeTruck: number): Observable<any>{
    const url = `${ this.baseUrl }/getOneTypeTruck/${codTypeTruck}`;
    return this.http.get<any>(url);
  }

  //* Carrocerías del usuario
  getCarrocerias(idUser: number): Observable<any>{
    const url = `${ this.baseUrl }/getCarroceriasUser/${idUser}`;
    return this.http.get<any>(url);
  }

  //* Eliminar un camión
  deleteTruckById(patente:string, eliminado: boolean): Observable<boolean>{
    const body = {patente, eliminado}
    const headers = {}
    console.log(body);
    return this.http.put(`${this.baseUrl}/logicDeleteTruck`, {patente, eliminado})
    //delete(`${this.baseUrl}/logicDeleteTruck`, {body: body})
    .pipe(
      catchError(() => of(false)),
      map(() => true)
    )
  }

}
