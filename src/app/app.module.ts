//Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ComponentsModule } from './components/components.module';

//Componentes
import { AppComponent } from './app.component';


//Otros
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
    OrdenarPorFechaPipe
  ],
  imports: [
     BrowserModule,
     RouterModule,
     APP_ROUTING,
     FormsModule,
     ComponentsModule,
     HttpClientModule,
     AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [TareasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
