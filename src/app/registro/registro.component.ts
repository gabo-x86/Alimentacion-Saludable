import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Registro} from 'src/app/models/models.module';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { UserService } from './../services/user.service';
import { User } from './../models/user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private registro: Registro;
  formularioRegistro: FormGroup;
  constructor(public formBuilder: FormBuilder, public userService: UserService) { }

  ngOnInit(){
    this.createFormularioRegistro();
    this.userService.getUsers();
  }
  onSubmit(){      
      let usr = {
        alias: this.formularioRegistro.value.alias,
        pass: this.formularioRegistro.value.password,
        email: this.formularioRegistro.value.email,
        name: this.formularioRegistro.value.nombre,
        lastName: this.formularioRegistro.value.apellido,
        bornDate: this.formularioRegistro.value.nacimiento,
        gender: this.formularioRegistro.value.sexo,
        weight: this.formularioRegistro.value.peso,
        height: this.formularioRegistro.value.altura
      }
      this.userService.insertUser(usr as User);
  }

  resetForm(){
    this.formularioRegistro=new FormGroup({});
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
      alias: ['', [ Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern(/^([a-zA-Z0-9]){1,16}$/)]],
      password: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(16), Validators.pattern(/^(?:\D*\d){3}\D*$/)]],
      ConfirmarPassword:['',[Validators.required]],
      email: ['',[Validators.required, Validators.email,Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@+([a-zA-Z\.\-])+$/)]],
      nombre:['',[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s\u00f1\u00d1]+$/)]],
      apellido: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s\u00f1\u00d1]+$/)]],
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

