import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TiposCarrocerias } from 'src/app/dmo-cargas/interfaces/tiposCarrocerias.interface';
import { DmoService } from 'src/app/dmo-cargas/services/dmo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-carrocerias',
  templateUrl: './dialog-carrocerias.component.html',
  styleUrls: ['./dialog-carrocerias.component.css']
})
export class DialogCarroceriasComponent implements OnInit{

  public truck: any;
  public title: any;
  public esAlta: boolean = false;
  public typesCarrocerias:TiposCarrocerias[] = [];
  public pristine: boolean = false;

  public myForm: FormGroup = this.fb.group({
    patente_carroceria: ['', Validators.required],
    cant_ejes:  ['', Validators.required],
    anio:  ['', Validators.required],
    cod_tipo_carroceria:  ['', Validators.required]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private dmoService: DmoService,
            private dialogRef: MatDialogRef<DialogCarroceriasComponent>){
              }


  ngOnInit(): void {
      this.esAlta = this.data.confirm;
      console.log(this.data);
      this.typesCarrocerias = this.data.types

      if (this.esAlta){
        this.title = 'Ingrese los datos de la nueva carrocería'
      }
      else {
        this.title = 'Edite los datos de la carrocería'

        this.myForm.get('patente_carroceria')
                ?.patchValue(this.data.carrroceria.patente_carroceria);
        this.myForm.get('cant_ejes')
                ?.patchValue(this.data.carrroceria.cant_ejes);
        this.myForm.get('anio')
                ?.patchValue(this.data.carrroceria.anio);
        this.myForm.get('cod_tipo_carroceria')
                ?.patchValue(this.data.carrroceria.cod_tipo_carroceria);
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
    return controls['patente_carroceria'].pristine &&
           controls['cant_ejes'].pristine &&
           controls['anio'].pristine  &&
           controls['cod_tipo_carroceria'].pristine
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


    //* Mayúscula para la patente
    const upperCasePatente = this.myForm.controls['patente_carroceria'].value.toUpperCase()
    this.myForm.patchValue({
      patente_carroceria: upperCasePatente
    });

    console.log(this.myForm);

    if (this.esAlta){
      this.dmoService.addCarroceria(this.myForm.value)
      .subscribe(async(resp)=>{
        console.log("resp", resp);
        if (resp){
          await  Swal.fire({
            title: 'Carrocería Agregada Existosamente',
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

      this.dmoService.updateCarroceria(this.myForm.value)
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
