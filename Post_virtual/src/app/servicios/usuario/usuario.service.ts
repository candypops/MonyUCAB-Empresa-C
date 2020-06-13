import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario[] = [
    {
      idUsuario: 0,
      idTipoUsuario: 0,
      idTipoIdentificacion: 0,
      usuario: '',
      fechaRegistro: '',
      nroIdentificacion: 0,
      email: '',
      telefono: '',
      direccion: '',
      estatus: 0

    }
  ];

  constructor(
    public http: HttpClient
  ) { }

  getUsuario(){
    return this.usuario[0];
  }

  guardarStorage(usuarioC: Usuario, idUsuario: number, idTipoUsuario: number, usuario: string,
                 fechaRegistro: string, nroIdentificacion: number, email: string, telefono: string, direccion: string ) {

    localStorage.setItem('idUsuario', idUsuario.toString());
    localStorage.setItem('idTipoUsuario', idTipoUsuario.toString());
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('fechaRegistro', fechaRegistro);
    localStorage.setItem('nroIdentificacion', nroIdentificacion.toString());
    localStorage.setItem('email', email);
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('direccion', direccion);

    this.usuario[0] = usuarioC;
  }

  inforUsurio(idusuario: number) {
    let url: string = 'http://monyucab.somee.com/api/Usuario/infoUsuario';

    let data = {
      "id" : idusuario
    };

    return this.http.post(url, data);
  }
}
