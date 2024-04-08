import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  mail?:string;
  currentUser?: User;

  constructor(private authService: AuthService,
              private router: Router){}


  get user():User[]|undefined{
    return this.authService.currentUser;
  }
  ngOnInit(): void {


    if (this.user && this.user.length > 0) {
  this.mail = this.user[0].email
  this.currentUser = this.user[0]
      console.log(this.user, typeof this.currentUser);
    }


    if (this.user) {
      //this.user[0].email;
    }
  }

  onLogOut():void{
    this.authService.logOut();
    this.router.navigateByUrl('/auth')

  }


}

