import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Camiones } from 'src/app/dmo-cargas/interfaces/camiones.interface';
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
  public pristine: boolean = false;

  public myForm: FormGroup = this.fb.group({
    patente_camion: ['', Validators.required],
    marca:  ['', Validators.required],
    modelo:  ['', Validators.required],
    anio:  ['', Validators.required],
    cod_tipo_camion:  ['', Validators.required]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private dmoService: DmoService,
            private dialogRef: MatDialogRef<DialogTrucksComponent>){
              }


  ngOnInit(): void {
      this.esAlta = this.data.confirm;
      console.log(this.data);
      this.typesTrucks = this.data.types

      if (this.esAlta){
        this.title = 'Ingrese los datos del nuevo camión'
      }
      else {
        this.title = 'Edite los datos del camión'

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

  capitalizeWords(input: string): string {
    return input.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  areAllFieldsPristine(): boolean {
    const controls = this.myForm.controls;
    return controls['patente_camion'].pristine &&
           controls['marca'].pristine &&
           controls['modelo'].pristine &&
           controls['anio'].pristine &&
           controls['cod_tipo_camion'].pristine;
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit():void{

    //* Valido que nada este vacío
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    //* Valido que hayan cambiado algún valor
    //Si el valor NO ha sido modificado --> true | Si ha sido modificado --> false
    if (this.areAllFieldsPristine()){
      this.pristine = true;
      return;
    } else this.pristine = false;


    //* Capitalizo las palabras
    const capitalizedMarca = this.capitalizeWords(this.myForm.get('marca')!.value);
    const capitalizedModelo = this.capitalizeWords(this.myForm.get('modelo')!.value);

    //* Mayúscula para la patente
    const upperCasePatente = this.myForm.controls['patente_camion'].value.toUpperCase()
    console.log(upperCasePatente);

    this.myForm.patchValue({
      patente_camion: upperCasePatente,
      marca: capitalizedMarca,
      modelo: capitalizedModelo,
    });

    console.log(this.myForm);

    if (this.esAlta){
      this.dmoService.addTruck(this.myForm.value)
      .subscribe(async resp=>{
        console.log("resp", resp);
        if (resp){
          await Swal.fire({
            title: 'Camión Agregado Existosamente',
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });

        }
        else {
          await Swal.fire({
            title: 'Ha Ocurrido un Error',
            icon: "error",
            timer: 2000
          });
        }

         this.dialogRef.close('updated')
      })
    }
    else {

      this.dmoService.updateTruck(this.myForm.value)
      .subscribe(async(resp)=>{

        if (resp.ok){
          await Swal.fire({
            title: `${resp.msg}`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });

        }
        else {
          await Swal.fire({
            title: `${resp.msg}`,
            icon: "error",
            timer: 2000
          });
        }

        this.dialogRef.close('updated')
      })
    }


  }


}
