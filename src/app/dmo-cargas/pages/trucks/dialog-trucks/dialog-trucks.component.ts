import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TiposCamiones } from 'src/app/dmo-cargas/interfaces/tiposCamiones.interface';
import { DmoService } from 'src/app/dmo-cargas/services/dmo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-trucks',
  templateUrl: './dialog-trucks.component.html',
  styleUrls: ['./dialog-trucks.component.css']
})
export class DialogTrucksComponent implements OnInit{

  public truck: any;
  public title: any;
  public esAlta: boolean = false;
  public typesTrucks:TiposCamiones[] = [];

  public myForm: FormGroup = this.fb.group({
    patente_camion: ['', Validators.required],
    marca:  ['', Validators.required],
    modelo:  ['', Validators.required],
    anio:  ['', Validators.required],
    cod_tipo_camion:  ['', Validators.required],
    eliminado: [false]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private dmoService: DmoService){
              }


  ngOnInit(): void {
      this.truck = this.data.truck;
      this.esAlta = this.data.confirm;
      console.log(this.data);
      this.typesTrucks = this.data.types

      if (this.esAlta){
        this.title = 'Ingrese los datos del nuevo camión'
      }
      else {
        this.title = 'Edite los datos del camión'
      }

      this.myForm.get('patente_camion')
                ?.patchValue(this.data.truck.patente_camion);
      this.myForm.get('anio')
                ?.patchValue(this.data.truck.anio);
      this.myForm.get('modelo')
                ?.patchValue(this.data.truck.modelo);
      this.myForm.get('marca')
                ?.patchValue(this.data.truck.marca);
      this.myForm.get('cod_tipo_camion')
                ?.patchValue(this.data.truck.cod_tipo_camion);
    }

  //Hacemos un método para el manejo de muchas validaciones
  isValidField( field:string ):boolean | null {
    //return myForm.controls['name'].getError('required') && myForm.controls['name'].touched
    //el getError es para un error específico
    //el errors es para ver si tiene algun tipo de error

    //console.log(this.myForm.controls[field].errors );
    return this.myForm.controls[field].errors &&
           this.myForm.controls[field].touched
  }

  getFieldError(field:string):string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      switch(key){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`
      }
    }
    return null;
  }

  onSubmit():void{
    console.log("En on subit");

    //! validar que se haya tocado efectivamente el formulario. sino como que yo entro y luego no modifo nada y hago la peticion igual

  // console.log(this.myForm.invalid);
  //   if (this.myForm.invalid) {
  //     this.myForm.markAllAsTouched();
  //     return;
  //   }
  //   console.log(this.myForm.value);
    //Para eliminar el formulario de la vista, no se muy bien para que lo hizo
    //(this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    //this.myForm.reset();
    this.dmoService.updateTruck(this.myForm.value)
    .subscribe((resp)=>{

      if (resp.ok){
        Swal.fire({
          title: `${resp.msg}`,
          icon: "success"
        });
      }
      else {
        Swal.fire({
          title: `${resp.msg}`,
          icon: "error"
        });
      }
    })

  }


}
