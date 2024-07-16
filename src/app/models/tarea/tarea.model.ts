export class TareaModel {

  tareaId?: string;
  titulo: string;
  descripcion: string;
  completeda: boolean;
  userId: string;
  vencimiento: string; 
    

  constructor() {
        this.tareaId = ''; 
        this.titulo = '';
        this.descripcion = '';
        this.completeda = false;
        this.userId = '';
        this.vencimiento = ''; 
  }

    
    
}