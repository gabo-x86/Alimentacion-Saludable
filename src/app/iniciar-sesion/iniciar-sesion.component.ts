import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators, FormControl} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  loginForm: FormGroup;
  /*new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });*/
  usuario:User[];

  constructor(public formBuilder: FormBuilder,public auth: AngularFireAuth, private router: Router, private userService: UserService) { }

  ngOnInit(): void { 
    this.createFormularioRegistro();
   }

  async onLogin(){
    //const { email, password } = this.loginForm.value;
    const Swal = require('sweetalert2');
    /* this.auth.auth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      this.searchUser(email);
      
    }).catch(err=>{
      console.log("Error: "+err);
    }) */
    if(this.isInvalid('email') || this.isInvalid('password')){
      Swal.fire({
        position: 'top-center',
        type: 'success',
        title: 'Datos Incorrectos',
        showConfirmButton:false,
        timer: 2000
      })
    }else{
      this.userService.getUsers()
      .snapshotChanges()
      .subscribe(item=>{
        this.usuario=[];
        item.forEach(element=>{
          let x = element.payload.toJSON();//Convertir a JSON
          x["$key"]=element.key;
          if(x["email"]==this.loginForm.value.email && x["pass"]==this.loginForm.value.password){
            this.usuario.push(x as User);
            localStorage.setItem("user", JSON.stringify(x as User));
          }
        });

        if(localStorage.getItem('user')=="undefined"){
          Swal.fire({
            position: 'top-center',
            type: 'success',
            title: 'Datos Incorrectos',
            showConfirmButton:false,
            timer: 2000
          })  
        }else{
          Swal.fire({
            position: 'top-center',
            type: 'success',
            title: 'Bienvenido '+JSON.parse(localStorage.getItem("user")).alias,
            showConfirmButton:false,
            timer: 2000
          })          
          this.router.navigate(['/']);
        }

      });
    }
  }


  public hasErrorControl(formControlName, errorType) {
    return this.loginForm.controls[formControlName].errors[errorType];
  }
  public isInvalid(formControlName: string): boolean {
    let control = this.loginForm.controls[formControlName];
    return !control.valid && (control.dirty || control.touched);
  }
  private createFormularioRegistro() {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.maxLength(25), Validators.minLength(5), Validators.email,Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@+([a-zA-Z\.\-])+$/)]],
      password: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(16), Validators.pattern(/(?:\D*\d){3}\D*/)]]
    })
  }

  charValidator(event){
    if(event.charCode == 13){
      return false;
    }else return true;
  }
  
}

