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
  public carrocerias:any[] = [];

  constructor(private dmoService: DmoService,
              private authService: AuthService){}

  get user():User | undefined{
    return this.authService.currentUser
  }
  ngOnInit(): void {

    console.log(this.user!.cod_usuario);

    this.dmoService.getTrucks(2)//this.user!.cod_usuario)
    .subscribe(
      truck =>{
        console.log(truck);
        this.trucks = truck
        //.filter();
        this.dmoService.getTypeTruck(truck[0].cod_tipo_camion)
        .subscribe(type=>{
          console.log(type);
        })

      })

      this.dmoService.getCarrocerias(2) //this.user!.cod_usuario)
      .subscribe(carroceria=>{
        console.log(carroceria);
        this.carrocerias = carroceria;
      })
  }

  onDeleteCamion():void{
    console.log("aca");
    this.dmoService.deleteTruckById("eqweqw1", false)
    .subscribe(
      jaja => { console.log(jaja)}
    )
  }




}
