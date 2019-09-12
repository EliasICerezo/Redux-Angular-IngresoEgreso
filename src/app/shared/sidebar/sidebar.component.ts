import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre:string;
  subscription = new Subscription();
  constructor(public authService:AuthService,private store:Store<AppState>) { }


  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(
      filter(auth=>auth.user!=null)
    )
    .subscribe(auth=>{
      this.nombre=auth.user.nombre;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  

  logout(){
    this.authService.logout()
  }

}
