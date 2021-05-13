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
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  usuario:User[];

  constructor(public auth: AngularFireAuth, private router: Router, private userService: UserService) { }

  ngOnInit(): void {  }

  async onLogin(){
    const { email, password } = this.loginForm.value;
    const Swal = require('sweetalert2');
    /* this.auth.auth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      this.searchUser(email);
      
    }).catch(err=>{
      console.log("Error: "+err);
    }) */

    this.userService.getUsers()
    .snapshotChanges()
    .subscribe(item=>{
      this.usuario=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["$key"]=element.key;
        if(x["email"]==email && x["pass"]==password){
          this.usuario.push(x as User);
          localStorage.setItem("user", JSON.stringify(x as User));
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
    });

  }
  
}

