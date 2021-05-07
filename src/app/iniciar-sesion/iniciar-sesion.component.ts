import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators, FormControl} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
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
  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
    
  }
  async onLogin(){
    const { email, password } = this.loginForm.value;
    this.auth.auth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      console.log("INICIO DE SESION EXITOSO!!!");
    })
    .catch(err=>console.log("Error: ",err));
  }

  async onLogOut(){
    this.auth.auth.signOut();
  }
  

}
