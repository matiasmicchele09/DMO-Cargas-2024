import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DmoCargasRoutingModule } from './dmo-cargas-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TrucksComponent } from './pages/trucks/trucks.component';
import { LayoutComponent } from './pages/layout/layout.component';




@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    TrucksComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    DmoCargasRoutingModule
  ]
})
export class DmoCargasModule { }
