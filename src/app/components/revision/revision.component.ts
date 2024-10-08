import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TareasService } from '../../services/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { TareaModel } from '../../models/tarea/tarea.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrl: './revision.component.css'
})
export class RevisionComponent {

  tarea: TareaModel = new TareaModel();
  public ID: string = "";
  data: any; 
  calendario: boolean = false;
  isUpdating: boolean = false;
  usuario: any; 



  constructor(public auth: AuthService, public tareaService: TareasService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ID = params["id"]; 
      this.data = this.getTareaData(this.ID); 
    });
  }




  ngOnInit() {
    this.data = this.getTareaData(this.ID); 
    this.usuario = this.auth.leerUsuario(); 
    this.cargarUsuario(); 
  }
  


  //TAREA

  //Actualiza la tarea al presionar en 'Modificar"
  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("Formulario no valido");
      return;
    }
    this.isUpdating = true;
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading(); 
    let peticion: Observable<any>
    peticion = this.tareaService.actualizarTarea(this.tarea);
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.tarea.titulo,
        text: 'Se actualizó correctamente'
      }).then(() => {
        this.isUpdating = false; 
        window.location.reload();
      });;
    });
    this.data = this.getTareaData(this.ID); 
  }




 getTareaData(ID: string) {
   this.tareaService.getTareaById(ID).subscribe((resp: any) => {   
      this.data = resp; 
      this.tarea.tareaId = ID;
      this.tarea.titulo = this.data.titulo; 
      this.tarea.descripcion = this.data.descripcion; 
      this.tarea.completada = this.data.completada; 
      this.tarea.vencimiento = this.data.vencimiento; 
   });
  }





  //CALENDARIO

  mostrarCalendario() {
    if (this.calendario == true) {
      this.calendario = false; 
    } else
      this.calendario = true; 
  }
  
  ocultarCalendario() {
    this.calendario = false; 
  }


  recibirFechaSeleccionada(fecha: string) {
    this.tarea.vencimiento = fecha.toString(); 
  }



 //USUARIO

  cargarUsuario() {
    this.usuario = this.auth.leerUsuario(); 
    let usuario = this.usuario; 
    this.tarea.userId = usuario; 
    console.log(this.tarea.userId); 
  }




}
