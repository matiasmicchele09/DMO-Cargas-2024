import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { enviroments } from 'src/environments/environments';

import { Observable, catchError, map, of, tap } from 'rxjs';
import { Camiones } from '../interfaces/camiones.interface';

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

  //* Todos los tipos de camiones
  getAllTypeTruck():Observable<any>{
    const url = `${ this.baseUrl }/getAllTypeTruck`;
    return this.http.get<any>(url);
  }

  //* Carrocerías del usuario
  getCarrocerias(idUser: number): Observable<any>{
    const url = `${ this.baseUrl }/getCarroceriasUser/${idUser}`;
    return this.http.get<any>(url);
  }

  //* Eliminar un camión
  deleteTruckById(patente_camion:string, eliminado: boolean): Observable<boolean>{
    const body = {patente_camion, eliminado}
    console.log(body);

    return this.http.put(`${this.baseUrl}/logicDeleteTruck`, {patente_camion, eliminado})
    //delete(`${this.baseUrl}/logicDeleteTruck`, {body: body})
    .pipe(
      catchError(() => of(false)),
      map(() => true)
    )
  }

  //* Editar un camión
  updateTruck(truck: Camiones): Observable<{ ok: boolean, msg: string }>{
    return this.http.put<{ ok: boolean, msg: string }>(`${this.baseUrl}/update_truck`, truck)
    .pipe(
      catchError((error) => of({ ok: false, msg: error.message }))
    )

  }

}
