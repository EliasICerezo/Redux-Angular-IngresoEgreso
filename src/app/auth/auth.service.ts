import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
import { EmptyItemsAction } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subscription : Subscription = new Subscription();
  private usuario:User;
  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private afDB: AngularFirestore,
               private store:Store<AppState>) { }

  initAuthListener(){
    this.afAuth.authState.subscribe(fbUser=>{
      // console.log(fbUser)  
      if(fbUser){
          this.subscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((usuarioObj:any)=>{
            // console.log(usuarioObj)
            const usuario = new User(usuarioObj);
            console.log(usuario);
            this.store.dispatch(new SetUserAction(usuario));
            this.usuario = usuario;
          });
        }else{
          this.usuario=null;
          this.subscription.unsubscribe();
        }
    });
  }

  crearUsuario(nombre:string, email:string, password:string){

    this.store.dispatch(new ActivarLoadingAction())
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(usuario =>{
      // console.log(usuario);
      const user:User ={
        uid: usuario.user.uid,
        nombre: nombre,
        email: usuario.user.email
      };

      this.afDB.doc(`${ user.uid}/usuario`).set(user)
      .then(()=>{
        this.router.navigate(['/']);
        this.store.dispatch(new DesactivarLoadingAction());
      }).catch( err=>{
        console.error(err);
        this.store.dispatch(new DesactivarLoadingAction());
      })
      ;

      
    })
    .catch(err=>{
      console.error(err);
      Swal.fire({
        title: 'Error en el registro',
        text: err.message,
        type: 'error',
        confirmButtonText: 'Ok'
      })
    });
  }


  login(email:string, password:string){
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(resp =>{
      // console.log(resp);
      this.router.navigate(['/']);
      this.store.dispatch(new DesactivarLoadingAction());
    }).catch(resp=>{
      
      console.error(resp);
      this.store.dispatch(new DesactivarLoadingAction());
      Swal.fire({
        title: 'Error en el login',
        text: resp.message,
        type: 'error',
        confirmButtonText: 'Ok'
      })
      
    });  
  }

  logout(){
    this.router.navigate(['/login']);
    this.store.dispatch(new SetUserAction(null));
    this.store.dispatch(new EmptyItemsAction());
    
    this.afAuth.auth.signOut();
  }

  isAuth(){
    return this.afAuth.authState.pipe(
      map(fbUser=> {
        if (fbUser == null){
          this.router.navigate(['/login']);
        }
        return fbUser!=null})
    )
  }

  getUsuario(){
    return {
      ...this.usuario
    };
  }



}
