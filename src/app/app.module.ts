import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';
import { RevisionComponent } from './components/revision/revision.component';

//Rutas
import { APP_ROUTING } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environment';
import { TareasService } from './services/tareas.service';
import { AuthService } from './services/auth.service';
import { OrdenarPorFechaPipe } from './pipes/ordenar-por-fecha.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    RegistroComponent,
    CalendarComponent,
    RevisionComponent,
    OrdenarPorFechaPipe
  ],
  imports: [
     BrowserModule,
     RouterModule,
     APP_ROUTING,
     FormsModule,
     HttpClientModule,
     AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [TareasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
