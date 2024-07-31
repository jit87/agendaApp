import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarPorFecha'
})
export class OrdenarPorFechaPipe implements PipeTransform {

 
  transform(tareas: any[], orden: 'asc' | 'desc' = 'desc'): any[] {
    if (!tareas) {
      return [];
    }

    return tareas.sort((a, b) => {
      return (new Date(a.vencimiento).getTime() - new Date(b.vencimiento).getTime()) * (orden === 'asc' ? 1 : -1);
    });
  }


}
