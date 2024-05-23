import { Component, OnInit } from '@angular/core';
import { DmoService } from '../../services/dmo.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.css']
})
export class TrucksComponent implements OnInit{

  public trucks:any[] = [];

  constructor(private dmoService: DmoService,
              private authService: AuthService){}

  get user():User | undefined{
    return this.authService.currentUser
  }
  ngOnInit(): void {

    console.log(this.user!.cod_usuario);
    this.dmoService.getTrucks(this.user!.cod_usuario)
    .subscribe(
      truck =>{
                console.log(truck[0]);
        this.trucks = truck;
        this.dmoService.getTypeTruck(truck[0].cod_tipo_camion)
        .subscribe(truck=>{
          console.log(truck);
        })
    })



}



}
