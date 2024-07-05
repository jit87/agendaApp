import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  usuario: UsuarioModel;
  recordarme = false; 




  constructor(private auth: AuthService, private router: Router) {
    this.usuario = new UsuarioModel(); 
  }



  ngOnInit() {

     if (localStorage.getItem('email')) {
       this.usuario.email = localStorage.getItem('email') ?? '';
       this.recordarme = true;
      }
    
  }
  
  



  login(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });

    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(resp => {
      console.log(resp);
      Swal.close();
      if (this.recordarme) {
         localStorage.setItem('email', this.usuario.email || '');
      }
      this.router.navigateByUrl('/home');
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
