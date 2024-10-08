import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { AuthService } from '../../services/auth.service';
import { TareasService } from '../../services/tareas.service';
import { TareaModel } from '../../models/tarea/tarea.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RevisionComponent } from '../revision/revision.component';
import { OrdenarPorFechaPipe } from '../../pipes/ordenar-por-fecha.pipe';


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
  tareasFiltradas: TareaModel[] = [];  
  
  



  constructor(public auth: AuthService, public tareaService: TareasService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    this.cargarTareas();
    this.getTareaId();  
    
  }

  ngOnInit() {
    this.cargarTareas();
    this.usuario = this.auth.leerUsuario(); 
    this.cargarUsuario(); 
    this.getTareaId();
  }   


  
  //GESTION DE TAREAS

  
  guardarTarea(form: NgForm) {
    
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
      this.getTareaId();
    });
  }




 
  getTareaId() {
    this.tareaService.getTareas().subscribe((resp: any) => { 
      if(resp)
          this.tareas = Object.keys(resp).map(key => {
            const tarea = resp[key];
            tarea.tareaId = key;   
            return tarea;
          });
          // Filtramos por el email del usuario
          this.tareasFiltradas = this.tareas.filter(tarea => tarea.userId === this.usuario); 
    });
  }






 async cargarTareas() {
   this.tareaService.getTareas().subscribe((resp: any) => { 
    if(resp)
      this.tareas = Object.keys(resp).map(key => {
        const tarea = resp[key];
        tarea.tareaId = key;
        return tarea;
      });
      this.tareasFiltradas = this.tareas.filter(tarea => tarea.userId === this.usuario);
      console.log('Tareas filtradas:', this.tareasFiltradas); 
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
        Swal.showLoading();
        await this.tareaService.eliminarTarea(tareaId).toPromise();
        Swal.close(); 
      }
       
      } catch (error) {
        this.errorMessage = error;
        console.error('Error al borrar la tarea:', error);
    } 
    
    this.getTareaId();
  }





 //Eliminar todas las tareas para un usuario concreto
/*async limpiarListado(userEmail: any) {
  this.tareaService.getTareas().subscribe(async (tareas: any) => {
    if (tareas) {
      const listaDeTareas = Object.values(tareas);

      try {
        // Mostrar confirmación antes de eliminar
        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: "No podrás revertir esto",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar todas',
          cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
          // Mostrar mensaje de carga mientras se eliminan las tareas
          Swal.fire({
            title: 'Espere',
            text: 'Eliminando las tareas...',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false
          });

          // Filtra las tareas que coincidan con el userEmail proporcionado
          const tareasAEliminar = listaDeTareas.filter((tarea: any) => tarea.userId === userEmail);

          if (tareasAEliminar.length === 0) {
            Swal.fire({
              title: 'Información',
              text: 'No se encontraron tareas para eliminar para este usuario.',
              icon: 'info',
              confirmButtonText: 'Aceptar'
            });
            return; // Salir si no hay tareas para eliminar
          }

          // Mapea las tareas a eliminar y espera que todas las promesas se resuelvan
          const eliminacionesPromises = tareasAEliminar.map((tarea: any) => {
            return this.tareaService.eliminarTareasUsuario(tarea.userId).toPromise();
          });

          // Ejecuta todas las promesas y espera a que se completen
          await Promise.all(eliminacionesPromises);

          Swal.fire({
            title: '¡Eliminado!',
            text: 'Todas las tareas del usuario han sido eliminadas.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            window.location.reload(); // Recargar la página o llama a this.cargarTareas(); para actualizar la lista sin recargar
          });
        }
      } catch (error) {
        console.error('Error al eliminar tareas:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al eliminar las tareas.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      console.log('No se encontraron tareas para eliminar.');
      Swal.fire({
        title: 'Información',
        text: 'No se encontraron tareas para eliminar.',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}
*/
  

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
    this.fechaVencimiento = fecha; 
    this.tarea.vencimiento = fecha; 
  }





  //USUARIO

  cargarUsuario() {
    this.usuario = this.auth.leerUsuario(); 
    let usuario = this.usuario; 
    this.tarea.userId = usuario; 
  }

  





}
