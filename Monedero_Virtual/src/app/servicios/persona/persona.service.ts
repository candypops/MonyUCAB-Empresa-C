import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../../models/persona.model';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public persona: Persona[] = [
    {
      idPersona: 0,
      idUsuario: 0,
      idEstadoCivil: 0,
      nombre: '',
      apellido: '',
      fechaNacimiento: ''
    }
  ];

  constructor(
    public http: HttpClient
  ) { }

  getVacio(){
    return this.persona[0];
  }

  getPersona(idusuario: number){
    let url: string = 'http://monyucab.somee.com/api/Usuario/infoPersona';

    let data = {
      "id" : idusuario
    };

    return this.http.post(url, data);

  }
}
