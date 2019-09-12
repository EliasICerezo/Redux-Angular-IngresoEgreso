import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public cargando: boolean;
  constructor(private authService:AuthService,
              private store:Store<AppState>) {
                this.cargando=false;
               }

  ngOnInit() {
    this.store.select('ui')
    .subscribe(ui=>{
      this.cargando= ui.isLoading;
    })
  }


  onSubmit(data){
    this.authService.login(data.email, data.password);
  }


}
