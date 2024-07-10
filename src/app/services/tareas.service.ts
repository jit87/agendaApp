import { Injectable } from '@angular/core';
import { TareaModel } from '../models/tarea/tarea.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient) { }

  public url = "https://agendaapp-22f38-default-rtdb.europe-west1.firebasedatabase.app/"; 


  //Añadimos la tarea a la bbdd de Firebase
  crearTarea(tarea: TareaModel) {
    this.http.post(`${this.url}/tareas.json`,tarea);
  }


  getTareas() {
    
  }


}
