import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { AppState } from '../ingreso-egreso.reducer';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  ingresos: number;
  egresos: number;

  contadorIngresos:number;
  contadorEgresos: number;

  subscription: Subscription = new Subscription();
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData:  MultiDataSet = [
    [],
  ];
  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
    .subscribe(ingresoEgreso =>{
      this.contarIngresoEgreso(ingresoEgreso.items);
    });

  }


  contarIngresoEgreso(items:IngresoEgreso[]){
    this.ingresos = 0;
    this.egresos = 0;

    this.contadorEgresos=0;
    this.contadorIngresos=0;

    items.forEach(item =>{
      if(item.tipo==='ingreso'){
        this.contadorIngresos+=1;
        this.ingresos+=item.monto;
      }else{
        
        this.contadorEgresos+=1;
        this.egresos+=item.monto;
      }
    })
    this.doughnutChartData= [
      [this.ingresos, this.egresos],
    ];
  }

}
