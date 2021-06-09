import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RoutingTuttaApp } from './routing-tutta-app';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { LoginComponent } from './login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';






@NgModule({
  declarations: [
    AppComponent,
   // LoginComponent,
   
      
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    RoutingTuttaApp,
    NoopAnimationsModule
   
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
