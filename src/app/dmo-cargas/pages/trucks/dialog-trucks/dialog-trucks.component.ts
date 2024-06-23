import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-trucks',
  templateUrl: './dialog-trucks.component.html',
  styleUrls: ['./dialog-trucks.component.css']
})
export class DialogTrucksComponent implements OnInit{

  public truck: any;
  public title: any;
  public esAlta: boolean = false;

  public myForm: FormGroup = this.fb.group({
    patente: '',
    anio: '',
    desc: '',
    modelo: '',
    marca: '',
  })



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder){}

  ngOnInit(): void {
    this.truck = this.data.truck;
    this.esAlta = this.data.confirm;
    console.log(this.data);
    if (this.esAlta){
      this.title = 'Ingrese los datos del nuevo camión'
    }
    else {
      this.title = 'Edite los datos del camión'
    }


    }


onSubmit():void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    //Para eliminar el formulario de la vista, no se muy bien para que lo hizo
    //(this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    this.myForm.reset();
  }


}
