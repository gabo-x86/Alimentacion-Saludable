import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Registro} from 'src/app/models/models.module';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private registro: Registro;
  formularioRegistro: FormGroup;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(){
    this.createFormularioRegistro();

  }
  private createFormularioRegistro() {
    this.formularioRegistro = this.formBuilder.group({
      alias: ['', [ Validators.required, Validators.maxLength(20), Validators.minLength(3) ]],
      password: ['',[Validators.required]],
      ConfirmarPassword:['',[Validators.required]],
      email: ['',[Validators.required]],
      nombre:['',[Validators.required]],
      apellido: ['',[Validators.required]],
      nacimiento: ['',[Validators.required]],
      sexo:['',[Validators.required]],
      peso:['',[Validators.required]],
      altura:['',[Validators.required]]
    })
  }
 getFormularioRegistro(event: Event){
    event.preventDefault();
    console.log(this.formularioRegistro.value);
  }
  

}

