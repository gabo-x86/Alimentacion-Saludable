import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommend-product',
  templateUrl: './recommend-product.component.html',
  styleUrls: ['./recommend-product.component.css']
})
export class RecommendProductComponent implements OnInit {

  formularioRecomendacionProducto: FormGroup;
  productList:Product[];

  constructor(public productService:ProductService,
     public formBuilder: FormBuilder,
     private router: Router ) { }

  /*ngOnInit(): void {
    this.getValues();
  }*/
  ngOnInit(){
    this.createformularioRecomendacionProducto();
    //this.userService.getUsers();
  }

  getValues(){
    this.productService.getProducts()
    .snapshotChanges()//Escucha la BD
    .subscribe(item=>{
      this.productList=[];
      item.forEach(element=>{
        let x = element.payload.toJSON();//Convertir a JSON
        x["$key"]=element.key;
        this.productList.push(x as Product);
        this.productList.sort((a,b)=>a.name.toString().localeCompare(b.name.toString()));//Ordena por cada vez que pushea un valor
      });
    });
  }
  
  prueba(){
    console.log(this.productList.length);
  }
  public isInvalid(formControlName: string): boolean {
    let control = this.formularioRecomendacionProducto.controls[formControlName];
    return !control.valid && (control.dirty || control.touched);
  }
  
  public hasErrorControl(formControlName, errorType) {
    return this.formularioRecomendacionProducto.controls[formControlName].errors[errorType];
  }

  private createformularioRecomendacionProducto() {
    this.formularioRecomendacionProducto = this.formBuilder.group({
      lowRankAge: ['', [ Validators.required, Validators.max(91), Validators.min(0)]],
    topRankAge: ['', [ Validators.required, Validators.max(91), Validators.min(0)]],
    lowRankWeight: ['', [ Validators.required, Validators.max(120), Validators.min(1)]],
    topRankWeight: ['', [ Validators.required, Validators.max(120), Validators.min(1)]],
    lowRankHeight: ['', [ Validators.required, Validators.max(250), Validators.min(50)]],
    topRankHeight: ['', [ Validators.required, Validators.max(250), Validators.min(50)]],
    })
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
