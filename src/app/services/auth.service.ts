import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario/usuario.model';
import { environment } from '../../environment';


import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  userToken: string | null | undefined;

  //INFO:
  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  
  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient, private router: Router ) {
    this.leerToken();
  }
   

  logout() {
    Swal.fire({
      title: 'Cerrando sesión...',
      html: 'Espere un momento',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/home').then(() => {
            window.location.reload();
          });
        }, 1000);
      }
    });
  }



  login(usuario: UsuarioModel) {
    const authData = {
        email: usuario.email,
        password: usuario.password,
        returnSecureToken: true
    };
     return this.http.post(
      `${this.url}signInWithPassword?key=${environment.firebaseConfig.apiKey}`,
       authData
    ).pipe(
      map((resp: any) => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }



  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signUp?key=${environment.firebaseConfig.apiKey}`,
      authData
    ).pipe(
      map((resp: any) => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }



  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }




  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken; 
  }


  
  estaAutenticado(): boolean{

  if (this.userToken && this.userToken.length > 2) {
    const expira = Number(localStorage.getItem('expira'));

    if (!isNaN(expira)) {
      const expiraDate = new Date();
      expiraDate.setTime(expira);
      if (expiraDate > new Date()) {
        return true;
      }
    }
  }

  return false;

  }





}
