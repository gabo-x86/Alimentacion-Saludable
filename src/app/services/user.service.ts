import { Injectable } from '@angular/core';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: AngularFireList<any>;
  selectedUser: User = new User();

  constructor(private firebase: AngularFireDatabase) { }

  getUsers(){
    return this.userList = this.firebase.list('users')
  } 
  insertUser(user: User){
    this.userList.push({
      alias: user.alias,
      pass: user.pass,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      bornDate: user.bornDate,
      gender: user.gender,
      weight: user.weight,
      height: user.height,
      role: user.role
    });
  }
  deleteUser($key: string){
    this.userList.remove($key);
  }
  
  testInsert($key: string){
    this.userList.set("/"+$key+"/role", "user");
  }
}
