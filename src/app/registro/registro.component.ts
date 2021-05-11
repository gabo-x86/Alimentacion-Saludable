import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup,Validators, FormControl} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
