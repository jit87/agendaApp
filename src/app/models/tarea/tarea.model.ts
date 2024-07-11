export class TareaModel {

  id?: string;
  titulo: string;
  descripcion: string;
  completeda: boolean;
  userId: string;
  vencimiento: string; 
    

  constructor() {
        this.id = ''; 
        this.titulo = '';
        this.descripcion = '';
        this.completeda = false;
        this.userId = '';
        this.vencimiento = ''; 
  }

    
    
}