import { Component, OnInit } from '@angular/core';
import { OperacionService } from '../../servicios/operacion/operacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OperacionTarjeta } from '../../models/operacionTarjeta.model';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { CuentaService } from '../../servicios/cuenta/cuenta.service';
import { Usuario } from '../../models/usuario.model';
import { AlertController } from '@ionic/angular';
import { PersonaService } from '../../servicios/persona/persona.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-operacion-detalle-t',
  templateUrl: './operacion-detalle-t.page.html',
  styleUrls: ['./operacion-detalle-t.page.scss'],
})
export class OperacionDetalleTPage implements OnInit {

  operacion: OperacionTarjeta;
  user: string;
  nrotarjeta: string;
  idreceptor: number;
  usuario: Usuario;
  aux: boolean = false;

  constructor(
    public _operacionServices: OperacionService,
    public _activatedRoute: ActivatedRoute,
    public _usuarioServices: UsuarioService,
    public _cuentaServices: CuentaService,
    public _personaServices: PersonaService,
    public router: Router,
    public alert: AlertController,
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(paramMap => {
      const recipeID = paramMap.get('operacionID');
      let id: number = +recipeID;
      this.operacion = this._operacionServices.getoperacionTarjeta(id);
    });
    this.usuario = this._usuarioServices.getUsuario();
    this._usuarioServices.inforUsurio(this.operacion.idUsuarioReceptor)
    .subscribe((data: any) => {
      this.user = data.usuario;
      this.idreceptor = data.idusuario;
    });
    this._cuentaServices.infoCuenta(this.operacion.idtarjeta)
        .subscribe((data: any) => {
          this.nrotarjeta = data.numero;
        });
    this._personaServices.getPersona(this.operacion.idUsuarioReceptor)
    .subscribe((data: any) => {
    }),
    (error: HttpErrorResponse) => {
      console.log('el receptor es un comercio');
      this.aux = true;
    }
  }

  SolicitarReintegro() {
    this.reintegroS();
  }

  async reintegroS() {
    const alertElement = await this.alert.create({
      header: '¿Esta seguro que solicitar reintegro?',
      message: 'Va a solicitar el reintegro de esta operación',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this._operacionServices.SolicitarReintegro(this.usuario.idUsuario, this.idreceptor )
                .subscribe((data: any) => {
                  this.router.navigate(['/tabs/operaciones']);
                });
          }
        },

        {
          text: 'Cancelar',
          role: 'cancelar'
        }
      ]
    });

    await alertElement.present();

  }

}
