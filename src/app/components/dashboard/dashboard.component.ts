import { Component } from '@angular/core';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { AuthService } from '../../services/auth.service';
import { TareasService } from '../../services/tareas.service';
import { TareaModel } from '../../models/tarea/tarea.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


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
  fechaVencimiento: string = "";

  tarea: TareaModel = new TareaModel(); 
  tareas: TareaModel[] = [];
  errorMessage: unknown;



  constructor(public auth: AuthService, public tareaService: TareasService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.cargarTareas();
    this.getTareaId(); 
  }   


  
  //GESTION DE TAREAS


  getTareaId() {
    this.tareaService.getTareas().subscribe((resp: any) => {
    this.tareas = Object.keys(resp).map(key => {
      const tarea = resp[key];
      tarea.tareaId = key;   
      return tarea;
    });
  });
  }


  async cargarTareas() {
     this.tareaService.getTareas().subscribe((resp: any) => {
      this.tareas = Object.keys(resp).map(key => resp[key]);
    });
  }



  async eliminarTarea(tareaId:any) {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarla',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: 'Espere',
          text: 'Eliminando la tarea',
          icon: 'info',
          allowOutsideClick: false
        });
      }
        Swal.showLoading();
        await this.tareaService.elimninarTarea(tareaId).toPromise();
        Swal.close(); 
        this.cargarTareas();
      } catch (error) {
        this.errorMessage = error;
        console.error('Error al borrar la tarea:', error);
      } 
        this.cargarTareas();
  }


  //FORMULARIO

  mostrarFormulario() {
    this.mostrarForm = true; 
    this.fechaVencimiento = "";
    this.tarea.titulo = "";
    this.tarea.descripcion = ""; 
  }



  ocultarFormulario() {
    this.mostrarForm = false;
  }


   
  //CALENDARIO DATEPICKER

  mostrarCalendario() {
    if(this.mostrarCalendar) {
      this.ocultarCalendario(); 
    } else
      this.mostrarCalendar = true; 
  }


  ocultarCalendario() {
     this.mostrarCalendar = false; 
  }


  recibirFechaSeleccionada(fecha: string) {
    console.log('Fecha seleccionada:', fecha);
    this.fechaVencimiento = fecha; 
    this.tarea.vencimiento = fecha; 
  }




  //ENVIO DE DATOS

  guardarDatos(form: NgForm) {
    
    if (form.invalid) {
      console.log("Formulario no valido")
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })

    Swal.showLoading(); 

    let peticion: Observable<any>

    peticion = this.tareaService.crearTarea(this.tarea);
    
    this.ocultarFormulario();

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.tarea.titulo,
        text: 'Se actualizó correctamente'
      });
      this.cargarTareas();
    });
 
  }

  





}
