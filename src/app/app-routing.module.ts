import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path:'', component: HomePageComponent
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: ()=> import('./dmo-cargas/dmo-cargas.module').then(m=>m.DmoCargasModule)
  },
  { //Cualquier otra ruta que no este definida en mi routing module quiero que redirija a home
    path:'**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
