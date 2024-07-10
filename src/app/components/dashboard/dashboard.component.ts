import { Component } from '@angular/core';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

 

  constructor(public auth: AuthService) {
   
  }

  ngOnInit() {
   
  }




}
