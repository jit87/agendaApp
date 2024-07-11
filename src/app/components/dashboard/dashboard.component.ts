import { Component } from '@angular/core';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { AuthService } from '../../services/auth.service';
import { TareasService } from '../../services/tareas.service';


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




  





}
