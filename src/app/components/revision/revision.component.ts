import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TareasService } from '../../services/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { TareaModel } from '../../models/tarea/tarea.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrl: './revision.component.css'
})
export class RevisionComponent {

  tarea: TareaModel = new TareaModel();



  constructor(public auth: AuthService, public tareaService: TareasService, private route: ActivatedRoute) {
    
  }

  ngInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id); 
    if(id)
    this.tarea.tareaId = id;  
  }
  
  
  

  getTarea(tareaId: TareaModel) {
    this.tareaService.getTareas().subscribe((resp: any) => {
      if (tareaId == resp.tareaId) {
          this.tarea = resp;
          console.log(resp); 
      }
    });
  }


  actualizarTarea(f: NgForm) {
    this.tareaService.actualizarTarea(this.tarea);
  }






}
