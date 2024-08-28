import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistroComponent } from './registro/registro.component';
import { RevisionComponent } from './revision/revision.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { APP_ROUTING } from '../app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CalendarComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    RevisionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    CalendarComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    RevisionComponent
  ]
})
export class ComponentsModule { }
