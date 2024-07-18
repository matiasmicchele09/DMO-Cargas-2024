import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DialogTrucksComponent } from './pages/trucks/dialog-trucks/dialog-trucks.component';
import { DmoCargasRoutingModule } from './dmo-cargas-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TrucksComponent } from './pages/trucks/trucks.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DialogTrucksComponent,
    LayoutComponent,
    NavbarComponent,
    TrucksComponent,
  ],
  imports: [
    CommonModule,
    DmoCargasRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class DmoCargasModule { }
