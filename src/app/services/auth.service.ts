import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario/usuario.model';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDvh-Xsk5qigKtOQ0wFciPp703YxMjsI3I';
  userToken: string | null | undefined;

  //INFO:
  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  
  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }
   

  logout() {
    localStorage.removeItem("token");
  }



  login(usuario: UsuarioModel) {
    const authData = {
        email: usuario.email,
        password: usuario.password,
        returnSecureToken: true
    };
     return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
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
      `${this.url}signUp?key=${this.apikey}`,
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
