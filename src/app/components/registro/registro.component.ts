import { Component } from '@angular/core';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  usuario: UsuarioModel;
  recordarme: false; 



  constructor(private auth: AuthService ,private router: Router) {
    this.usuario = new UsuarioModel();
    this.recordarme = false; 
  }



  onSubmit(form: NgForm) {

    if (form.invalid) { return; }

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor'
      });

      Swal.showLoading();

      this.auth.nuevoUsuario(this.usuario).subscribe(resp => {
        console.log(resp);
        Swal.close();
        if (this.recordarme) {
           localStorage.setItem('email', this.usuario.email || '');
        }
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          title: "Error al autenticar",
          icon: 'error',
          text: err.error.error.message
        });
      });
    
  }




}
