import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators, FormControl} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {  }

  async onLogin(){
    const { email, password } = this.loginForm.value;
    const Swal = require('sweetalert2');
    this.auth.auth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      Swal.fire({
        position: 'top-center',
        type: 'success',
        title: 'Bienvenido'+email,
        showConfirmButton:false,
        timer: 2000
      })
      this.router.navigate(['/']);
      
    })
     if( email.length==0 || password.length==0){
       Swal.fire({
        position: 'top-center',
        type: 'success',
        title: 'Datos Incorrectos',
        showConfirmButton:false,
        timer: 2000
      })
  }
     if(email!=this.loginForm.value || password!=this.loginForm.value)
     {
       Swal.fire({
        position: 'top-center',
        type: 'success',
        title: 'Datos Incorrectos',
        showConfirmButton:false,
        timer: 2000
      })

     }
  }
  

  async onLogOut(){
    this.auth.auth.signOut();
  }
  

}
