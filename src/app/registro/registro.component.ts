import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup,Validators, FormControl} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';

import { NgForm } from '@angular/forms';
import { UserService } from './../services/user.service';
import { User } from './../models/user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers();
    this.resetForm();
  }

  onSubmit(userForm: NgForm){
    if(userForm.value.$key == null)
      this.userService.insertUser(userForm.value)
    else      
      //this.userService.UpdateProduct(userForm.value);
      //this.resetForm(userForm);
      console.log("erroooooor!!");
  }

  resetForm(userForm?: NgForm){
    if(userForm != null){
      userForm.reset();
      this.userService.selectedUser = new User();
    }
  }

}
