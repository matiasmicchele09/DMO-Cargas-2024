import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DmoCargasRoutingModule } from './dmo-cargas-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    DmoCargasRoutingModule
  ]
})
export class DmoCargasModule { }
