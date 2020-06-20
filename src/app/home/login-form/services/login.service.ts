import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient) { }

  loginPersona(usuario:String, contrasena:String){
    let url= "http://monyucab.somee.com/api/Usuario/loginPersona"
    this.http.post(url, 
      {user: usuario, contra: contrasena}).
      toPromise().then((data : any) =>{
        console.log(data)
      }
      )
      return this.http.post(url, {user: usuario, contra: contrasena});
  }

  loginComercio(usuario:String, contrasena:String){
    let url= "http://monyucab.somee.com/api/Usuario/loginComercio"
    this.http.post(url, 
      {user: usuario, contra: contrasena}).
      toPromise().then((data : any) =>{
        console.log(data)
      }
      )
      return this.http.post(url, {user: usuario, contra: contrasena});
  }
}