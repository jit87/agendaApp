import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { AppComponent } from './app.component';

//Rutas
import { APP_ROUTING } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
     BrowserModule,
     RouterModule,
     APP_ROUTING,
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
