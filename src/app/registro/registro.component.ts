import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Registro} from 'src/app/models/models.module';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { UserService } from './../services/user.service';
import { User } from './../models/user';
import { exists } from 'node:fs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private registro: Registro;
  formularioRegistro: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private router: Router) { }

  ngOnInit(){
    this.createFormularioRegistro();
    //this.userService.getUsers();
  }

  onSubmit(){
    const Swal = require('sweetalert2');
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

      if(!this.isInvalid('alias') && !this.isInvalid('password') && this.formularioRegistro.value.password==this.formularioRegistro.value.ConfirmarPassword &&
      !this.isInvalid('email') && !this.isInvalid('nombre') && !this.isInvalid('apellido')  && !this.isInvalid('nacimiento') && 
      !this.isInvalid('sexo') && !this.isInvalid('peso') && !this.isInvalid('altura')){

        if(usr.alias=='' || usr.pass=='' || this.formularioRegistro.value.password=='' || 
        this.formularioRegistro.value.ConfirmarPassword=='' || usr.email=='' || usr.name=='' || 
        usr.lastName=='' || usr.bornDate=='' || usr.gender=='' || usr.weight=='' || usr.height==''){
          Swal.fire({
            position: 'top-center',
            type: 'success',
            title: 'Llene todos los campos',
            showConfirmButton:false,
            timer: 2000
          })
        }else if(usr.alias!='' && usr.pass!='' && this.formularioRegistro.value.password!='' && 
            this.formularioRegistro.value.ConfirmarPassword!='' && usr.email!='' && usr.name!='' && 
            usr.lastName!='' && usr.bornDate!='' && usr.gender!='' && usr.weight!='' && usr.height!=''){
              this.aliasAndEmailExist(usr as User);

        }
      }else if(usr.alias=='' || usr.pass=='' || this.formularioRegistro.value.password=='' || 
      this.formularioRegistro.value.ConfirmarPassword=='' || usr.email=='' || usr.name=='' || 
      usr.lastName=='' || usr.bornDate=='' || usr.gender=='' || usr.weight=='' || usr.height==''){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: 'Llene todos los campos',
          showConfirmButton:false,
          timer: 2000
        })
      }

  }

  aliasAndEmailExist(usr:User){
    const Swal = require('sweetalert2');
    let aliasExist=false;
    let emailExist=false;
    let lock=false;
    this.userService.getUsers()
    .snapshotChanges()
    .subscribe(item=>{      
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["$key"]=element.key;
        //this.userService.deleteUser(x["$key"]);
        if(x["alias"]==usr.alias){
          aliasExist=true;
        }
        if(x["email"]==usr.email){
          emailExist=true;
        }
      });

      if(!aliasExist && !emailExist && !lock){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: '',
          showConfirmButton:false,
          timer: 2000
        })
        this.userService.insertUser(usr as User);
        lock=true;
        this.router.navigate(['/login']);

      }else if(aliasExist && !lock){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: 'Este Alias ya está en uso',
          showConfirmButton:false,
          timer: 2000
        })

      }else if(emailExist && !lock){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: 'Este Correo ya está en uso',
          showConfirmButton:false,
          timer: 2000
        })

      }else if(aliasExist && emailExist){
        Swal.fire({
          position: 'top-center',
          type: 'success',
          title: 'Registro exitoso',
          showConfirmButton:false,
          timer: 2000
        })
      }
    });

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
      alias: ['', [ Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern(/^([a-zA-Z0-9-ñÑ]){1,5000}$/)]],
      password: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(16), Validators.pattern(/(?:\D*\d){3}\D*/)]],
      ConfirmarPassword:['',[Validators.required]],
      email: ['',[Validators.required, Validators.maxLength(25), Validators.minLength(5), Validators.email,Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@+([a-zA-Z\.\-])+$/)]],
      nombre:['',[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z-áÁ-éÉ-íÍ-óÓ-úÚ\s\u00f1\u00d1]+$/)]],
      apellido: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z-áÁ-éÉ-íÍ-óÓ-úÚ\s\u00f1\u00d1]+$/)]],
      nacimiento: ['',[Validators.required]],
      sexo:['',[Validators.required]],
      peso:['',[Validators.required, Validators.min(10), Validators.max(120)]],
      altura:['',[Validators.required, Validators.min(50), Validators.max(250)]]
    },{
      validator:this.confirmPasswordMatch('password', 'ConfirmarPassword')
    })
  }

  confirmPasswordMatch(controlName: string, matchingControlName: string) {    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPasswordMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
  
 getFormularioRegistro(){
    //event.preventDefault(); 
    //console.log(this.formularioRegistro.value);
  }
  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46 || charCode == 44) {
      return false;
    }
    return true;

  }

}

