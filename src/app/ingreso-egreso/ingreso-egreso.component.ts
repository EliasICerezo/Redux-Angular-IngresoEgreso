import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from './ingreso-egreso.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo = 'ingreso';

  loadingSubs: Subscription = new Subscription();
  cargando:boolean;



  constructor(public ingresoegresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit() {

    this.store.select('ui')
    .subscribe( ui => this.cargando = ui.isLoading);

    this.forma = new FormGroup({
      description: new FormControl('', Validators.required),
      monto: new FormControl('0', Validators.min(1)),
    })
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }


  crearIngresoEgreso(){
    console.log(this.forma.value);
    this.store.dispatch(new ActivarLoadingAction);
    let values = this.forma.value;
    const ingresoEgreso = new IngresoEgreso({
      description: values.description,
      monto: parseInt( values.monto ), 
      tipo: this.tipo,
    });
    this.ingresoegresoService.crearIngresoEgreso(ingresoEgreso)
    .then(resp =>{
      Swal.fire('Creado', ingresoEgreso.description, 'success' );
      this.forma.reset({
        monto:0
      });
      this.store.dispatch(new DesactivarLoadingAction);
    })
    .catch(err=>{
      Swal.fire('Creado', err, 'error' ); 
      this.store.dispatch(new DesactivarLoadingAction);
    })
    ;
    console.log(ingresoEgreso);
    
  }

 



}
