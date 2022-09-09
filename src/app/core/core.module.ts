import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CardsComponent } from '../cards/cards.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
 import { AddHeaderInterceptor } from '../login/inceptor';
 import { LoginService } from '../login/login.service';
import { IncrementoComponent } from './components/incremento/incremento.component';
import { ModaleComponent } from './components/modal/modal.component';




@NgModule({
  declarations: [   
    HomePageComponent,
    CardsComponent,
    IncrementoComponent,
    ModaleComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    CardsComponent,
    IncrementoComponent
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
      deps: [LoginService]
   }
  ]
})
export class CoreModule { }
