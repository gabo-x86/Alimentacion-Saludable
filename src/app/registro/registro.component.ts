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
      alias: ['', [ Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern('^\w+')]],
      password: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(16)]],
      ConfirmarPassword:['',[Validators.required]],
      email: ['',[Validators.required, Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      nombre:['',[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('/^[a-z][a-z\s]*$/')]],
      apellido: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      nacimiento: ['',[Validators.required]],
      sexo:['',[Validators.required]],
      peso:['',[Validators.required, Validators.min(10), Validators.max(120)]],
      altura:['',[Validators.required, Validators.min(50), Validators.max(150)]]
    })
  }

 getFormularioRegistro(){
    //event.preventDefault(); 
    console.log(this.formularioRegistro.value);
  }
 
  

}

