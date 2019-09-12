import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public cargando:Boolean = false;
  subscription: Subscription = new Subscription();
  constructor(private authService: AuthService,
              public store:Store<AppState>) { }

  ngOnInit() {
    this.subscription= this.store.select('ui')
    .subscribe(ui=>{
      this.cargando = ui.isLoading;
    });
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe
  }
  onSubmit(data){
    console.log(data);
    this.authService.crearUsuario(data.nombre, data.email, data.password);
  }

}
