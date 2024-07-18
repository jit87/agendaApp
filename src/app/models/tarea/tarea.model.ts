export class TareaModel {

  tareaId?: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  userId: string;
  vencimiento: string; 
    

  constructor() {
        this.tareaId = ''; 
        this.titulo = '';
        this.descripcion = '';
        this.completada = false;
        this.userId = '';
        this.vencimiento = ''; 
  }

    
    
}