import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from "./login.component";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}