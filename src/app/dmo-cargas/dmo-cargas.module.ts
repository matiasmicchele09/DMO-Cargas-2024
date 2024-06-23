import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DmoCargasRoutingModule } from './dmo-cargas-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TrucksComponent } from './pages/trucks/trucks.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DialogTrucksComponent } from './pages/trucks/dialog-trucks/dialog-trucks.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    TrucksComponent,
    LayoutComponent,
    DialogTrucksComponent
  ],
  imports: [
    CommonModule,
    DmoCargasRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule


  ]
})
export class DmoCargasModule { }
