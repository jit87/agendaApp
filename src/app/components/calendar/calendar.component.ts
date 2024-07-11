import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarDays: number[] = [];
  currentMonth: number = 0;
  currentYear: number= 0;
  monthNames: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'
  ];

  constructor(private tareas: TareasService) { }
  

  @Output() fechaSeleccionada = new EventEmitter<string>();

  ngOnInit() {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    this.calendarDays = [];

 
    for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
      this.calendarDays.push(new Date(this.currentYear, this.currentMonth, -i + 1).getDate());
    }


    for (let i = 1; i <= daysInMonth; i++) {
      this.calendarDays.push(i);
    }
  }

  previousMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  isToday(day: number): boolean {
    const today = new Date();
    return today.getFullYear() === this.currentYear &&
           today.getMonth() === this.currentMonth &&
           today.getDate() === day;
  }


  ///////////////////Funciones externas al calendario/////////////////////

  guardarDia(day: number) {
    const fecha = day + "/" + (this.currentMonth + 1) + "/" + this.currentYear;
    this.fechaSeleccionada.emit(fecha); 
  }






}
