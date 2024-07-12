import { Injectable } from '@angular/core';
import { TareaModel } from '../models/tarea/tarea.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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


  elimninarTarea(tareaId: string): Observable<any> {
    console.log(tareaId);
    return this.http.delete(`${this.url}/tareas/${tareaId}.json`);
  }

   


}
