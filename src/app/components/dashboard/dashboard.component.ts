import { Component } from '@angular/core';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { AuthService } from '../../services/auth.service';
import { TareasService } from '../../services/tareas.service';
import { CalendarOptions, EventInput  } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  usuario: any; 
  mostrarForm: boolean = false; 
  fecha: Date = new Date();
  mostrarCalendar: boolean = false; 

  
  //Propiedades del calendario de https://fullcalendar.io/docs/angular
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    //dateClick: this.capturarFecha.bind(this), // Método para capturar la fecha
    eventClick: this.capturarEvento.bind(this) // Método para capturar el evento del calendario
  };

  
 

  constructor(public auth: AuthService, public tareaService: TareasService) {
   
  }

  ngOnInit() {

   
  }


  mostrarFormulario() {
    this.mostrarForm = true; 
  }



  ocultarFormulario() {
    this.mostrarForm = false;
  }




  mostrarCalendario() {
    if(this.mostrarCalendar) {
      this.ocultarCalendario(); 
    } else
      this.mostrarCalendar = true; 
  }




  ocultarCalendario() {
     this.mostrarCalendar = false; 
  }


  // Método para capturar la fecha seleccionada en el calendario
 /* capturarFecha(info: any) {
    this.fecha = info.date;
    this.ocultarCalendario(); // Ocultar el calendario después de seleccionar la fecha
  }*/

  // Método para capturar el evento del calendario (si es necesario)
  capturarEvento(info: any) {
    console.log('Evento seleccionado:', info.event);
  }


  





}
