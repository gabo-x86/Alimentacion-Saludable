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
  

  public isInvalid(formControlName: string): boolean {
    let control = this.formularioRegistro.controls[formControlName];
    return !control.valid && (control.dirty || control.touched);
  }
  
  public hasErrorControl(formControlName, errorType) {
    return this.formularioRegistro.controls[formControlName].errors[errorType];
  }

  private createFormularioRegistro() {
    this.formularioRegistro = this.formBuilder.group({
      alias: ['', [ Validators.required, Validators.maxLength(20), Validators.minLength(3) ]],
      password: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(16)]],
      ConfirmarPassword:['',[Validators.required, Validators.minLength(7), Validators.maxLength(16)]],
      email: ['',[Validators.required]],
      nombre:['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellido: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      nacimiento: ['',[Validators.required]],
      sexo:['',[Validators.required]],
      peso:['',[Validators.required]],
      altura:['',[Validators.required]]
    })
  }

 getFormularioRegistro(){
    //event.preventDefault();

 
    console.log(this.formularioRegistro.value);
  }
  

}

