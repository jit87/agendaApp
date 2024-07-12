export class TareaModel {

  TareaId?: string;
  titulo: string;
  descripcion: string;
  completeda: boolean;
  userId: string;
  vencimiento: string; 
    

  constructor() {
        this.TareaId = ''; 
        this.titulo = '';
        this.descripcion = '';
        this.completeda = false;
        this.userId = '';
        this.vencimiento = ''; 
  }

    
    
}