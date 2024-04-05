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

  mail?: string;
  userDash?: any;

  get user():User|undefined{
    return this.authService.currentUser;

  }
  ngOnInit(): void {
    console.log("en Dash", this.user);
   //this.userDash = JSON.parse(localStorage.getItem(this))
  //  console.log(localStorage.getItem("usuario"));
  //   console.log(this.userDash);
  //   console.log(this.userDash.cod_usuario);
  //  this.mail = this.userDash?.email
  }


}

