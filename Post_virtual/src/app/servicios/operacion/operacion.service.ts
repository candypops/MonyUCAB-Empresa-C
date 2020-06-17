import { Injectable } from '@angular/core';
import { OperacionCuenta } from '../../models/operacionCuenta.model';
import { OperacionMonedero } from '../../models/operacionMonedero.model';
import { OperacionTarjeta } from '../../models/operacionTarjeta.model';
import { Reintegro } from '../../models/reintegro.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {

  operacionesCuenta: OperacionCuenta[] = [
    {
      idoperacioncuenta: 0,
      idcuenta: 0,
      idUsuarioReceptor: 0,
      fecha: '',
      hora: '',
      monto: 0,
      referencia: ''
    }
  ];
  operacionesMonedero: OperacionMonedero[] = [
    {
      idoperacionesmonedero: 0,
      idusuario: 0,
      idTipoOperacion: 0,
      monto: 0,
      fecha: '',
      hora: '',
      referencia: ''
    }
  ];
  operacionesTarjeta: OperacionTarjeta[] = [
    {
      idoperaciontarjeta: 0,
      idUsuarioReceptor: 0,
      idtarjeta: 0,
      fecha: '',
      hora: '',
      monto: 0,
      referencia: ''
    }
  ];

  reintegros: Reintegro[] = [
    {
      idreintegro: 0,
      idusuario_solicitante: 0,
      idusuario_receptor: 0,
      fecha_solicitud: '',
      referencia: '',
      status: ''
    }
  ];

  constructor(
    public http: HttpClient
  ) { }

  getoperacionesCuentaVacio() {

    return [...this.operacionesCuenta];

  }

  getoperacionesMonederoVacio() {

    return [...this.operacionesMonedero];

  }

  getoperacionesTarjetaVacio() {

    return [...this.operacionesTarjeta];

  }

  getreintegrosVacio() {

    return [...this.reintegros];

  }

  guardarCuentas(cuentas: OperacionCuenta[]) {
    this.operacionesCuenta = cuentas;
  }

  guardarTarjetas(tarjeta: OperacionTarjeta[]) {
    this.operacionesTarjeta = tarjeta;
  }

  guardarMonedero(monedero: OperacionMonedero[]) {
    this.operacionesMonedero = monedero;
  }

  guardarReintegros(reintegro: Reintegro[]) {
    this.reintegros = reintegro;
  }

  getoperacionesCuenta(idusuario: number) {
    let url: string = 'http://monyucab.somee.com/api/Usuario/operacionesCuentas';

    let data = {
      "id" : idusuario
    };


    return this.http.post(url, data);
  }

  getoperacionesTarjeta(idusuario: number) {
    let url: string = 'http://monyucab.somee.com/api/Usuario/operacionesTarjetas';

    let data = {
      "id" : idusuario
    };

    return this.http.post(url, data);
  }

  getoperacionesMonedero(idusuario: number) {
    let url: string = 'http://monyucab.somee.com/api/Usuario/operacionesMonedero';

    let data = {
      "id" : idusuario
    };

    return this.http.post(url, data);
  }

  getoperacionesreintegros(idusuario: number) {
    let url: string = 'http://monyucab.somee.com/api/Usuario/infoReintegros';

    let data = {
      "id" : idusuario
    };

    return this.http.post(url, data);
  }


  getoperacionCuenta(operacionID: number){
    return {
      ...this.operacionesCuenta.find(operacion => {
        return operacion.idoperacioncuenta === operacionID;
      })
    };
  }

  getoperacionMonedero(operacionID: number){
    return {
      ...this.operacionesMonedero.find(operacion => {
        return operacion.idoperacionesmonedero === operacionID;
      })
    };
  }

  getoperacionTarjeta(operacionID: number){
    return {
      ...this.operacionesTarjeta.find(operacion => {
        return operacion.idoperaciontarjeta === operacionID;
      })
    };
  }

  getreintegro(operacionID: number){
    return {
      ...this.reintegros.find(operacion => {
        return operacion.idreintegro === operacionID;
      })
    };
  }

  aceptarReintegro(operacionID: number) {
    let url: string = 'http://monyucab.somee.com/api/Usuario/aceptarReintegro';

    let data = {
      "id" : operacionID
    };

    return this.http.post(url, data);
  }

  recharzarReintegro(operacionID: number) {
    let url: string = 'http://monyucab.somee.com/api/Usuario/rechazarReintegro';

    let data = {
      "id" : operacionID
    };

    return this.http.post(url, data);
  }

}
