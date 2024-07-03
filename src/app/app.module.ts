import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { AppComponent } from './app.component';

//Rutas
import { APP_ROUTING } from './app.routes';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
     BrowserModule,
     RouterModule,
     APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
