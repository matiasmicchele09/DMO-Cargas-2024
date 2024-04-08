import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DmoCargasRoutingModule } from './dmo-cargas-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';




@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent


  ],
  imports: [
    CommonModule,
    DmoCargasRoutingModule
  ]
})
export class DmoCargasModule { }
