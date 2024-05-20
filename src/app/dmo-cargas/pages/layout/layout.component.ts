import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  public navbarItems = [
    // {label:'Panel', icon:'label', url:'./list'},
    // {label:'Mis Camiones', icon:'add', url:'./new-hero'},
    // {label:'Buscar Cargas', icon:'search', url:'./search'},
    // {label:'Mis Solicitudes', icon:'search', url:'./search'}
    {label:'Panel', url:'./dashboard'},
    {label:'Mis Camiones', url:'./mis-camiones'},
    {label:'Buscar Cargas'},
    {label:'Mis Solicitudes'}
  ]

  constructor(private authService: AuthService,
    private router: Router){}

  get user():User|undefined{
    return this.authService.currentUser;
  }

  onLogOut():void{
    this.authService.logOut();
    this.router.navigateByUrl('/auth');
  }
}
