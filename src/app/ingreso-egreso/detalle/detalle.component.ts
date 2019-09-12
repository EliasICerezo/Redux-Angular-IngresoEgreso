import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy{
  items : IngresoEgreso[];
  detalleSubscription: Subscription = new Subscription();
  constructor(private store:Store<AppState>, public authService: AuthService, public afDB:AngularFirestore) { }

  ngOnInit() {
    this.items = [];
    this.detalleSubscription = this.store.select('ingresoEgreso')
    .subscribe(ingresoEgreso =>{
      console.log(ingresoEgreso);
      this.items = ingresoEgreso.items;
    });
  }

  ngOnDestroy(){
    this.detalleSubscription.unsubscribe();
  }

  borrarItem(uid:string){
    const user = this.authService.getUsuario();
    this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
    .delete()
    .then(resp =>{
      Swal.fire('Borrado Correcto','OK','success');
    }).catch(err=>{
      Swal.fire('Error al borrar', err, 'error');
    })
  }


}
