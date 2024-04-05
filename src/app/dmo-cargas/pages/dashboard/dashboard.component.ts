import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private authService: AuthService){}

  //! ACA ESTA EL TEMA, SI PONGO QUE SEA DE TIPO USER ME DICE QUE ES UNDEFINED, AL PONER ANY SE ARREGLÓ.
  //! VER COMO LO PUEDO SOLUCIONAR.
  get user():any|undefined{
    return this.authService.currentUser;

  }
  ngOnInit(): void {

    if (this.user) {
      this.user[0].email
      console.log("aca", this.user[0].email);
      ;
    }
  }


}

