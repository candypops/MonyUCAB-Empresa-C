import { Injectable } from '@angular/core';
import { Comercio } from '../../models/comercio.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  public comercio: Comercio[] = [
    {
      idUsurio: 0,
      razonSocial: '',
      nombreRepresentante: '',
      apellidoRepresentante: ''
    }
  ];

  constructor(
    public http: HttpClient
  ) { }

  getVacio(){
    return this.comercio[0];
  }

  getComercio(idusuario: number){
    let url: string = 'http://monyucab.somee.com/api/Usuario/infoComercio';

    let data = {
      "id" : idusuario
    };

    return this.http.post(url, data);

  }

  ajustarComercio(idusuario: number, razon:string, nombreR:string, apellidoR) {
    let url: string = 'http://monyucab.somee.com/api/Usuario/ajustarComercio';

    let data = {
      "idUsuario" : idusuario,
      "razonSocial" : razon,
      "nombre" : nombreR,
      "apellido" : apellidoR
    };

    return this.http.post(url, data);
  }
}
