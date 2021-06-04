import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto.module';
import { Router } from '@angular/router';

import { UserService } from './../services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  private product: Producto;
  formularioRegistroProducto: FormGroup;
  constructor(public formBuilder: FormBuilder, public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createFormularioRegistroProducto();
  }
  public isInvalid(formControlName: string): boolean {
    let control = this.formularioRegistroProducto.controls[formControlName];
    return !control.valid && (control.dirty || control.touched);
  }

  public hasErrorControl (formControlName, errorType) {
    return this.formularioRegistroProducto.controls[formControlName].errors[errorType];
  }
  private createFormularioRegistroProducto () {
    this.formularioRegistroProducto = this.formBuilder.group({
      $key: ['', []],
      productName: ['', [Validators.required, Validators.maxLength(20),
         Validators.minLength(3), Validators.pattern(/^[a-zA-Z-áÁ-éÉ-íÍ-óÓ-úÚ\s\u00f1\u00d1]+$/)]],
      productType: ['', [Validators.required]],
      description: ['', []],
      energeticValue: ['', [Validators.required, Validators.max(3000)], Validators.min(0)],
      carbohydrates: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      protein: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      fat: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      cholesterol: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      sodium: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      fiber: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      calcium: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      vitaminA: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB1: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB2: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB3: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB5: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminC: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminD: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminE: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminK: ['', [Validators.max(100000), Validators.min(0)]],
      image: ['', []]

    })
  }
  getFormularioRegistroProducto(){}
//event.preventDefault(); 
    //console.log(this.formularioRegistro.value);
  
}
