import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfiguracionesService } from './services/configuraciones.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  formConfig = new FormGroup({
    contraVieja : new FormControl ('', [Validators.pattern(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/),
    Validators.required]),
    contraNueva : new FormControl ('', [Validators.pattern(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/),
    Validators.required])
  });

  constructor(public s_configuraciones : ConfiguracionesService) { }

  ngOnInit(): void {
  }

  cambiarContra(){
    this.s_configuraciones.cambiarContra(this.formConfig.get('contraVieja').value,this.formConfig.get('contraNueva').value).subscribe(
      (data: any)=>{},
      (err :HttpErrorResponse) =>{
        if (err.status != 200){
          alert("Ha ocurrido un error")
        }else {
          alert("Cambio exitoso")
        }
      }
    );
  }

}
