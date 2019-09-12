import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe } from './orden-ingreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso',ingresoEgresoReducer),
  ],
  declarations: [
    DashboardComponent,
    EstadisticasComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    OrdenIngresoPipe,
  ]
})
export class IngresoEgresoModule { }
