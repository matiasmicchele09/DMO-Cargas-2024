import { Component, Input } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public navbarItems = [
    // {label:'Panel', icon:'label', url:'./list'},
    // {label:'Mis Camiones', icon:'add', url:'./new-hero'},
    // {label:'Buscar Cargas', icon:'search', url:'./search'},
    // {label:'Mis Solicitudes', icon:'search', url:'./search'}
    {label:'Panel'},
    {label:'Mis Camiones', url:'./mis-camiones'},
    {label:'Buscar Cargas'},
    {label:'Mis Solicitudes'}
  ]

  @Input()
  public user?: User|undefined;

}
