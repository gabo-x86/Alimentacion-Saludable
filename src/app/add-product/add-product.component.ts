import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from './../models/product';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  //private product: Product;
  formularioRegistroProducto: FormGroup;

  constructor(public formBuilder: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.createFormularioRegistroProducto();
  }

  onSubmit(){
    console.log("ANTES..");
    let product={
      name: this.formularioRegistroProducto.value.productName,
      category: this.formularioRegistroProducto.value.productType,
      description: this.formularioRegistroProducto.value.description,
      energy: this.formularioRegistroProducto.value.energeticValue,
      carbohydrates: this.formularioRegistroProducto.value.carbohydrates,
      protein: this.formularioRegistroProducto.value.protein,
      grease: this.formularioRegistroProducto.value.fat,
      cholesterol: this.formularioRegistroProducto.value.cholesterol,
      sodium: this.formularioRegistroProducto.value.sodium,
      fiber: this.formularioRegistroProducto.value.fiber,
      calcium: this.formularioRegistroProducto.value.calcium,
      vitaminA: this.formularioRegistroProducto.value.vitaminA,
      vitaminB9: this.formularioRegistroProducto.value.vitaminB9,
      vitaminB1: this.formularioRegistroProducto.value.vitaminB1,
      vitaminB12: this.formularioRegistroProducto.value.vitaminB12,
      vitaminB2: this.formularioRegistroProducto.value.vitaminB2,
      vitaminC: this.formularioRegistroProducto.value.vitaminC,
      vitaminB3: this.formularioRegistroProducto.value.vitaminB3,
      vitaminD: this.formularioRegistroProducto.value.vitaminD,
      vitaminB5: this.formularioRegistroProducto.value.vitaminB5,
      vitaminE: this.formularioRegistroProducto.value.vitaminE,
      vitaminB6: this.formularioRegistroProducto.value.vitaminB6,
      vitaminK: this.formularioRegistroProducto.value.vitaminK,
      vitaminB7: this.formularioRegistroProducto.value.vitaminB7,
      image: "www.google.com"
    }
    this.productService.insertProduct(product as Product);
    console.log("HECHO");

  }

  public isInvalid(formControlName: string): boolean {
    let control = this.formularioRegistroProducto.controls[formControlName];
    return (!control.valid && (control.dirty || control.touched));
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
      cholesterol: ['', [Validators.max(100000), Validators.min(0)]],
      sodium: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      fiber: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      calcium: ['', [Validators.required, Validators.max(100000), Validators.min(0)]],
      vitaminA: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB9: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB1: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB12: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB2: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB3: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB5: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminC: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminD: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminE: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB6: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminK: ['', [Validators.max(100000), Validators.min(0)]],
      vitaminB7: ['', [Validators.max(100000), Validators.min(0)]],
      image: ['', []]

    })
  }
  getFormularioRegistroProducto(){}
//event.preventDefault(); 
    //console.log(this.formularioRegistro.value);
  
}
