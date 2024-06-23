import { Component, OnInit } from '@angular/core';
import { DmoService } from '../../services/dmo.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { TiposCamiones } from '../../interfaces/tiposCamiones.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogTrucksComponent } from './dialog-trucks/dialog-trucks.component';
@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.css']
})
export class TrucksComponent implements OnInit{

  public trucks:any[] = [];
  public carrocerias:any[] = [];
  public typesTrucks:TiposCamiones[] = [];

  constructor(private dmoService: DmoService,
              private authService: AuthService,
              private dialog: MatDialog){}

  get user():User | undefined{
    return this.authService.currentUser
  }
  ngOnInit(): void {

    console.log(this.user!.cod_usuario);

    //* Traigo todos los tipos de camiones para poder manejarlos en el front y no hacer tantas consultas al back
    //* Hay solo 4 tipos de camiones, pero si hubiera mas y el camionero tendría todos los tipos deberia hacer un monton de consultas al back solo para pedir la desc del camion
    this.dmoService.getAllTypeTruck()
    .subscribe(type=>this.typesTrucks = type)

    this.dmoService.getTrucks(2)//this.user!.cod_usuario)
    .subscribe(
      truck =>{
        truck.forEach((element:any) => {
          let descripcion;
          //* Asigno la descrición en esta variable por cada camión que vaya iterando, luego la agrego al arreglo de objetos de camiones
          descripcion = this.typesTrucks.filter(types => types.cod_tipo_camion === element.cod_tipo_camion);
          //* Simplemente poniendo el nombre de campo que quiero (descTipoCamion) se crea éste en el objeto.
          element.descTipoCamion = descripcion[0].descripcion;
          if (!element.eliminado){
          this.trucks.push(element);
        }
        });

        console.log(this.trucks);
      })

      this.dmoService.getCarrocerias(2) //this.user!.cod_usuario)
      .subscribe(carroceria=>{
        console.log(carroceria);
        this.carrocerias = carroceria;
      })
  }

  onDeleteCamion(truck:any):void{
    Swal.fire({
      title: `¿Seguro que desea eliminar el camión ${truck.marca}, patente ${truck.patente_camion}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`
    }).then((result) => {

      if (result.isConfirmed) {
        this.dmoService.deleteTruckById(truck.patente_camion, true)
        .subscribe((resp)=>{
          console.log(resp);
          this.trucks = this.trucks.filter(t => t.patente_camion !== truck.patente_camion);
          Swal.fire("Camión eliminado", "", "success");
        })
      } else if (result.isDenied) {
        return;
      }
    });
  }

  openDialog(truck:any, esAlta:boolean): void {
    console.log(truck);
    const dialogRef = this.dialog.open(DialogTrucksComponent,
      { data: {truck,
               confirm: esAlta
              },
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}

