import { Injectable } from '@angular/core';
import { TareaModel } from '../models/tarea/tarea.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  tarea: TareaModel = new TareaModel; 
  tareas: TareaModel[] = [];
 
  constructor(private http: HttpClient,  private authService: AuthService, private firestore: AngularFirestore) { }

  private url = "https://agendaapp-22f38-default-rtdb.europe-west1.firebasedatabase.app/"; 

 



   getTareas():Observable<any> {
     return this.http.get(`${this.url}/tareas.json?`);
  } 



  getTareaById(tareaId: string) {
     return this.http.get(`${this.url}/tareas/${tareaId}.json`);
  }



   //Añadimos la tarea a la bbdd de Firebase
  crearTarea(tarea: TareaModel): Observable<any> {
    return this.http.post(`${this.url}/tareas.json`, tarea);
  }




  eliminarTarea(tareaId: TareaModel): Observable<any> {
  
    const deleteUrl = `${this.url}/tareas/${tareaId}.json`; 
    
    return this.http.delete(deleteUrl).pipe(
      catchError((error: HttpErrorResponse) => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error del cliente: ${error.error.message}`;
          } else {
            errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
          }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }



   /*eliminarTareasUsuario(userId: TareaModel): Observable<any> {
  
    const deleteUrl = `${this.url}/tareas/${userId}.json`; 
    
    return this.http.delete(deleteUrl).pipe(
      catchError((error: HttpErrorResponse) => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error del cliente: ${error.error.message}`;
          } else {
            errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
          }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }*/








  actualizarTarea(tarea: TareaModel) {
    const tareaTemp = {
      ...tarea
    }
    
    return this.http.put(`${this.url}/tareas/${tarea.tareaId}.json`, tareaTemp);
  }









  

   


}
