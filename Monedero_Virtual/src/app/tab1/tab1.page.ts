import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import { PersonaService } from '../servicios/persona/persona.service';
import { Persona } from '../models/persona.model';
import { AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  usuario: Usuario;
  persona: Persona;
  fecha: any;
  fechaR: any;

  constructor(
    public _usuarioServices: UsuarioService,
    public _personaServices: PersonaService,
    public alert: AlertController
  ) {}

  ngOnInit(){
    this.usuario = this._usuarioServices.getUsuario();
    this.persona = this._personaServices.getVacio();
    this._personaServices.getPersona(this.usuario.idUsuario)
        .subscribe((data: any) => {
          this.persona = data;
          this.fecha = this.persona.fecha_nacimiento.split('T', 1 );
        });
    this.fechaR = this.usuario.fechaRegistro.split('T', 1 );
  }

  modificarUsuario( f: NgForm){
    let ident: number = + f.value.identificacion;

    this._personaServices.ajustarPersona(this.usuario.idUsuario, f.value.nombre, f.value.apellido)
        .subscribe((data: any) => {
          console.log('se modifico la persona');
        });

    this._usuarioServices.ajustarUsurio(this.usuario.idUsuario, f.value.user, ident, f.value.email, f.value.telefono,
                                        f.value.direccion )
        .subscribe((data: any) => {
          console.log('se modifico el usuario');
        },
        (error: HttpErrorResponse) => {
          this.AlertaError();
        });

  }

  async AlertaError() {
    const alertElement = await this.alert.create({
      header: 'Error al modificar usuario',
      message: 'El usuario debe de ser unico ',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
          }
        },
      ]
    });

    await alertElement.present();

  }

}
