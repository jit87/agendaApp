import { Injectable } from '@angular/core';
import { TareaModel } from '../models/tarea/tarea.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  tarea: TareaModel = new TareaModel; 
  tareas: TareaModel[] = [];
 
  constructor(private http: HttpClient) { }

  private url = "https://agendaapp-22f38-default-rtdb.europe-west1.firebasedatabase.app/"; 




  getTareas() {
    return this.http.get(`${this.url}/tareas.json`);
  }


   //Añadimos la tarea a la bbdd de Firebase
  crearTarea(tarea: TareaModel): Observable<any> {
    return this.http.post(`${this.url}/tareas.json`, tarea);
  }


  elimninarTarea(tareaId: TareaModel): Observable<any> {
    console.log(tareaId); 
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

   


}
