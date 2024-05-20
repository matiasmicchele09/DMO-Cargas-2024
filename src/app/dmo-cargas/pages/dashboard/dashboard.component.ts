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

  constructor(private authService: AuthService,
              private router: Router){}

  get user():User|undefined{
    return this.authService.currentUser;
  }

  ngOnInit(): void {
    console.log("aca en el dash");
    console.log(this.user);
  }
}
