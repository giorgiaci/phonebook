import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';





const routes: Routes = [
  {
    path: 'person',
    
    canActivateChild:[LoginGuard],
    loadChildren: () =>
      import('./person/person.module').then((m) => m.PersonModule),

  },
  {   path: 'login', component: LoginComponent},
  {   path: 'home',  component: HomePageComponent, canActivate:[LoginGuard]
  },

 {   path: '', redirectTo:'login' , pathMatch: 'full'},
 
  {   path: '**',    component: PageNotFoundComponent },
  
 
  
]; 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class RoutingTuttaApp {

}